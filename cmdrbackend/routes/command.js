const router = require("express").Router();
const { newCommand, getAllCommands } = require("../services/command");

router.post("/new", newCommand);

router.get("/all", getAllCommands);

module.exports = router;
