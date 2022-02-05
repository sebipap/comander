const router = require("express").Router();
const { newOrderService, allOrdersService, orderCoursesService } = require("../services/order");

router.post("/new", newOrderService);
router.get("/all", allOrdersService);
router.get("/courses/:id", orderCoursesService);

module.exports = router;
