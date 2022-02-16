const Course = require("../models/Course");
const Extra = require("../models/Extra");
const MenuItemVariant = require("../models/MenuItemVariant");
const Order = require("../models/Order");
const { newCourse, shoppingCartPrice, fullCourseData } = require("./course");

const newOrderService = async (req, res) => {
  const orderReq = req.body;
  console.log(orderReq);
  const coursesReq = orderReq.courses;
  const total = (await shoppingCartPrice(coursesReq)).shoppingCartPrice;
  const order = new Order({
    requestTimeDate: new Date(),
    deliveryLocation: orderReq.deliveryLocation,
    orderNote: orderReq.orderNote,
    total,
  });

  try {
    const savedOrder = await order.save();
    coursesReq.forEach((courseReq) => {
      newCourse(courseReq, savedOrder._id);
      console.log(courseReq);
    });
    res.status(201);
    res.send({
      message: "Orden Cargada por $" + savedOrder.total,
      id: savedOrder._id,
    });
  } catch (e) {
    res.status(400).send({ message: `error ${e}` });
  }
};

const orderCoursesService = async (req, res) => {
  return res.send(await orderCourses(req.params.id));
};

const orderCourses = async (id) => {
  try {
    const courses = await Course.find({ order_id: id });
    return await Promise.all(
      courses.map(async (course) => await fullCourseData(course))
    );
  } catch (err) {
    console.log("err" + err);
  }
};

const allOrdersService = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.send(orders);
  } catch (error) {
    return res.send({ error });
  }
};

const getStatusService = async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(500).send({ error: "Orden o estado incorrecto" });

  try{
    const order = await Order.findById( id)

    return res.send({status: order.status})
  }catch{
    return res.status(400).send({message: "that order dosnt exist"})
  }


}

const changeStatusService = async (req, res) => {
  const { id, newStatus } = req.body;
  if (!id || !newStatus)
    return res.status(500).send({ error: "Orden o estado incorrecto" });

  await Order.updateOne({_id: id}, {status: newStatus, acceptTimeDate: Date.now()})

  return res.send({message: `Cambiado el estado a ${newStatus}`})
};

module.exports = { newOrderService, allOrdersService, orderCoursesService, changeStatusService, getStatusService };
