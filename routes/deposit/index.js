const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Deposit
router.get("/", verifyToken, require("./controller").getDeposit);
router.get("/approval", verifyToken, require("./controller").approval);
router.get(
    "/search/:search",
    verifyToken,
    require("./controller").getDepositName
);
router.get("/:id", verifyToken, require("./controller").getDepositId);
router.post("/", verifyToken, require("./controller").createDeposit);
router.put("/:id", verifyToken, require("./controller").updateDeposit);
router.get(
    "/member/:id",
    verifyToken,
    require("./controller").getDepositByMemberId
);

module.exports = router;
