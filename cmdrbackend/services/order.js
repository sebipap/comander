const Course = require("../models/Course");
const Order = require("../models/Order");
const { newCourse, shoppingCartPrice } = require("./course");

const newOrderService = async (req, res) => {


  const orderReq = req.body;
  console.log(orderReq);
  const coursesReq = orderReq.courses;
  const total = (await (shoppingCartPrice(coursesReq))).shoppingCartPrice
  const order = new Order({
    timeDate: new Date(),
    deliveryLocation: orderReq.deliveryLocation,
    orderNote: orderReq.orderNote,
    total 
  });

  try {
    const savedOrder = await order.save();
    coursesReq.forEach((courseReq) => {
      newCourse(courseReq, savedOrder._id);
      console.log(courseReq)
    });
    res.status(201)
    res.send({message: 'Orden Cargada por $' + savedOrder.total, id: savedOrder._id} );
  } catch (e) {
    res.status(400).send({message: `error ${e}`});
  }
};



module.exports = { newOrderService };
