const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Event
router.get("/", require("./controller").getEvent);
router.get("/search", require("./controller").searchEvent);
router.get("/sort", require("./controller").sortEvent);
router.get("/:id", require("./controller").getEventId);
router.post("/", verifyToken, require("./controller").createEvent);
router.put("/:id", verifyToken, require("./controller").updateEvent);
router.delete("/:id", verifyToken, require("./controller").deleteEvent);

module.exports = router;
