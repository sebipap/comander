const router = require("express").Router();
const { newMenuItem, getAllMenuItems, getAllMenuItemDataById } = require("../services/menuItem");

router.post("/new", newMenuItem);

router.get("/all", getAllMenuItems);

router.get("/:id", getAllMenuItemDataById);


module.exports = router;
