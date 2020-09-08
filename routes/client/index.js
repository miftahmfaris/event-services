const router = require("express").Router();
const { verifyToken, upload } = require("../../helpers");

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

//Route Logout
router.get("/logout", verifyToken, require("./controller").logout);

module.exports = router;
