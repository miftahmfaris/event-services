const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Admin
router.get("/", verifyToken, require("./controller").getAdmin);
router.get("/dashboard", verifyToken, require("./controller").getSummary);
router.get(
    "/username/:username",
    verifyToken,
    require("./controller").getAdminName
);
router.get("/:id", verifyToken, require("./controller").getAdminId);
router.post("/", verifyToken, require("./controller").createAdmin);
router.put("/:id", verifyToken, require("./controller").updateAdmin);
router.delete("/:id", verifyToken, require("./controller").deleteAdmin);

//Route Login
router.post("/login", require("./controller").login);

//Route Logout
router.get("/logout", verifyToken, require("./controller").logout);

module.exports = router;
