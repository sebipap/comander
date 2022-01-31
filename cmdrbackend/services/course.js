const res = require("express/lib/response");
const Course = require("../models/Course");
const Extra = require("../models/Extra");
const MenuItem = require("../models/MenuItem");
const MenuItemVariant = require("../models/MenuItemVariant");

const newCourse = async (courseReq, order_id) => {
  const course = new Course({...courseReq, order_id});
  try {
    const savedCourse = await course.save();

    console.log(`Pedido Subido!`);
  } catch (e) {
    console.log(e);
  }
};

const commandCoursesService = async (req, res) => {
  const courses = await Course.find({ command_id: req.params.id });
  res.send(courses);
};

const fullCourseDataService = async (req, res) => {
  const {
    menuItemVariant_id,
    amount,
    special,
    courseMoment,
    extras_ids,
    aditionalOptionsConfiguration,
  } = req.body;

  const variant = await MenuItemVariant.findById(menuItemVariant_id);
  const menuItem = await MenuItem.findById(variant.menuItem_id);
  const extras = await Promise.all(
    extras_ids.map(async (id) => await Extra.findById(id))
  );

  const extrasPrice = extras
    .map((extra) => extra.price)
    .concat(0)
    .reduce((tot, x) => tot + x);

  const price = amount * (variant.price + extrasPrice);

  res.send({
    amount,
    special,
    courseMoment,
    extras_ids,
    aditionalOptionsConfiguration,
    variant,
    menuItem,
    extras,
    price,
  });
};

const coursePrice = async (course) => {
  const { menuItemVariant_id, amount, extras_ids } = course;
  const variant = await MenuItemVariant.findById(menuItemVariant_id);
  const extras = await Promise.all(
    extras_ids.map(async (id) => await Extra.findById(id))
  );
  const extrasPrice = extras
    .map((extra) => extra.price)
    .concat(0)
    .reduce((tot, x) => tot + x);

  const finalPrice = amount * (variant.price + extrasPrice);

  return { id: menuItemVariant_id, price: finalPrice };
};

const shoppingCartPrice = async (shoppingCart) => {

  const coursesPrices = await Promise.all(
    shoppingCart.map(async (course) => (await coursePrice(course)).price)
  );
  const finalShoppingCartPrice = coursesPrices.concat(0).reduce((tot, x) => tot + x);

  return ({shoppingCartPrice: finalShoppingCartPrice})
};

const coursePriceService = async (req, res) =>
  res.send(await coursePrice(req.body));

const shoppingCartPriceService = async (req, res) =>
  res.send(await shoppingCartPrice(req.body));

module.exports = {
  newCourse,
  commandCoursesService,
  coursePriceService,
  fullCourseDataService,
  shoppingCartPriceService,
  shoppingCartPrice
};
