const router = require("express").Router();
const {
  newOrderService,
  allOrdersService,
  orderCoursesService,
  changeStatusService,
  getStatusService,
} = require("../services/order");

router.post("/new", newOrderService);
router.get("/all", allOrdersService);
router.get("/courses/:id", orderCoursesService);
router.post("/changestatus", changeStatusService);
router.get("/status/:id", getStatusService);

module.exports = router;
