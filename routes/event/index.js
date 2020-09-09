const router = require("express").Router();
const { verifyToken } = require("../../helpers");

//Route CRUD Event
router.get("/", verifyToken, require("./controller").getEvent);
router.get(
    "/search/:search",
    verifyToken,
    require("./controller").getEventName
);
router.get("/:id", verifyToken, require("./controller").getEventId);
router.post("/", require("./controller").createEvent);
router.put("/:id", verifyToken, require("./controller").updateEvent);
router.delete("/:id", verifyToken, require("./controller").deleteEvent);

module.exports = router;
