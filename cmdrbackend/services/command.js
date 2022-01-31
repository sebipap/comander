const Command = require("../models/Command");
const Course = require("../models/Course");
const { newCourse } = require("./course");

const newCommand = async (req, res) => {

  const commandReq = req.body;
  console.log(commandReq);
  const coursesReq = commandReq.courses;
  const command = new Command({
    kitchen: req.body.kitchen,
    date: req.body.date,
    time: req.body.time,
    waiter: req.body.waiter,
    table: req.body.table,
    extras: req.body.extras,
  });

  try {
    const savedCommand = await command.save();
    coursesReq.forEach((courseReq) => {
      newCourse(courseReq, savedCommand._id);
    });
    res.status(201)
    res.send({message: 'Comanda Subida'});
  } catch (e) {
    res.status(400).send("error");
  }
};

const getAllCommands = async (req, res) => {
  const commands = await Command.find();

  res.send(commands);
};

module.exports = { newCommand, getAllCommands };
