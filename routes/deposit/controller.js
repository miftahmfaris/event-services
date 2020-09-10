const { Deposit, Member } = require("../../models");

module.exports = {
    getDeposit: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Deposit.find().populate(
                    "memberID",
                    "fullname balance isAdmin email"
                );

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getDepositName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await Deposit.find({
                $or: [
                    { fullname: { $regex: search, $options: "i" } },
                    { address: { $regex: search, $options: "i" } },
                ],
            });
            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    getDepositId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Deposit.findById(id);

            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createDeposit: async (req, res) => {
        try {
            const member = await Member.findById(req.token.id);

            const result = await Deposit.create({
                ...req.body,
                memberID: req.token.id,
                previousBalance: member.balance,
            });

            res.send({ message: "Deposit Successfull", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    approval: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Deposit.find({
                    status: "PENDING",
                }).populate("memberID", "fullname email balance isAdmin");

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateDeposit: async (req, res) => {
        const { id } = req.params;
        try {
            const { status } = req.body;

            if (req.token.isAdmin) {
                if (status !== "PENDING") {
                    req.body.approvedBy = req.token.email;
                }

                const currentDeposit = await Deposit.findById(id);

                if (status === "APPROVED") {
                    await Deposit.findByIdAndUpdate(id, {
                        $set: {
                            ...req.body,
                            balance:
                                currentDeposit.previousBalance +
                                currentDeposit.amount,
                        },
                    });
                } else if (status === "REJECTED") {
                    await Deposit.findByIdAndUpdate(id, {
                        $set: {
                            ...req.body,
                            balance: currentDeposit.previousBalance,
                        },
                    });
                }
                const finalDeposit = await Deposit.findById(id);

                await Member.findByIdAndUpdate(finalDeposit.memberID, {
                    $set: {
                        balance: finalDeposit.balance,
                    },
                });

                res.send({
                    message: `Update data succcess`,
                    data: finalDeposit,
                });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
