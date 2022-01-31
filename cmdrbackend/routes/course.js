const { commandCoursesService, coursePriceService, fullCourseDataService, shoppingCartPriceService } = require("../services/course");

const router = require("express").Router();


router.get("/command/:id", commandCoursesService);
router.post("/price/", coursePriceService)
router.post("/shoppingCartPrice/", shoppingCartPriceService)
router.post("/fullData/", fullCourseDataService)


module.exports = router;
