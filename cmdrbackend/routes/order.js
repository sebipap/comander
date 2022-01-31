const router = require("express").Router();
const { newOrderService } = require("../services/order");

router.post("/new", newOrderService);

module.exports = router;
