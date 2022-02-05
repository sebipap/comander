const router = require("express").Router();
const { newMenuItem, getAllMenuItems, getAllMenuItemDataById, deleteMenuItem } = require("../services/menuItem");

router.post("/new", newMenuItem);

router.get("/all", getAllMenuItems);

router.get("/:id", getAllMenuItemDataById);

router.post("/delete/:id", deleteMenuItem);



module.exports = router;
