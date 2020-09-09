const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Order
router.get("/", verifyToken, require("./controller").getOrder);
router.get("/approval", verifyToken, require("./controller").approval);
router.get(
    "/search/:search",
    verifyToken,
    require("./controller").getOrderName
);
router.get("/:id", verifyToken, require("./controller").getOrderId);
router.post("/", require("./controller").createOrder);
router.put("/:id", verifyToken, require("./controller").updateOrder);
router.delete("/:id", verifyToken, require("./controller").deleteOrder);

module.exports = router;
