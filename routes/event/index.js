const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD User
router.get("/", verifyToken, require("./controller").getUser);
router.get("/approval", verifyToken, require("./controller").approval);
router.get("/search/:search", verifyToken, require("./controller").getUserName);
router.get("/:id", verifyToken, require("./controller").getUserId);
router.post("/", require("./controller").createUser);
router.put("/:id", verifyToken, require("./controller").updateUser);
router.delete("/:id", verifyToken, require("./controller").deleteUser);

//Route Login
router.post("/login", require("./controller").login);

module.exports = router;
