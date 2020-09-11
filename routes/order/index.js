const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Order
router.get("/", verifyToken, require("./controller").getOrder);
router.get("/approval", verifyToken, require("./controller").approval);
router.get("/search", verifyToken, require("./controller").searchOrder);
router.get("/sort", verifyToken, require("./controller").sortOrder);
router.get("/:id", verifyToken, require("./controller").getOrderId);
router.post("/", verifyToken, require("./controller").createOrder);
router.put("/:id", verifyToken, require("./controller").updateOrder);
router.delete("/:id", verifyToken, require("./controller").deleteOrder);
router.get(
    "/member/:id",
    verifyToken,
    require("./controller").getOrderByMemberId
);

module.exports = router;
