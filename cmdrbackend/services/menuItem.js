const AditionalOption = require("../models/AditionalOption");
const Category = require("../models/Category");
const Extra = require("../models/Extra");
const MenuItem = require("../models/MenuItem");
const MenuItemVariant = require("../models/MenuItemVariant");
const { newAditionalOption } = require("./aditionalOption");
const { newExtra } = require("./extra");
const { newMenuItemVariant } = require("./menuItemVariant");

const newMenuItem = async (req, res) => {
  let {
    name,
    token,
    category,
    description,
    imgURL,
    tags,
    variants,
    extras,
    aditionalOptions,
  } = req.body;

  if (!name && !token)
    return res.status(500).send({ error: "Escriba el Nombre" });
  if (!category) return res.status(500).send({ error: "Escriba la Categoría" });
  if (!description) description = "";
  if (!imgURL) imgURL = "";
  if (!tags) tags = [];
  if (!variants || !variants[0])
    return res.status(500).send({ error: "Introduzca al Menos Una Variante" });
  if (!extras) extras = [];
  if (!aditionalOptions) aditionalOptions = [];

  if (!variants[0].name) variants[0].name = "Por Defecto";
  if (!variants[0].price) variants[0].name = 0;

  let newToken = req.body.token;
  let newName = req.body.name;

  if (newToken && !newName) newName = newToken;

  if (newName && !newToken) newToken = newName;

  newToken = (newToken + "").toUpperCase().replace(/\s/g, "");

  const query = { token: newToken };

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  const categoryUpsert = { name: category };

  const categoryObj = await Category.findOneAndUpdate(
    categoryUpsert,
    categoryUpsert,
    options
  );

  const update = {
    ...req.body,
    token: newToken,
    name: newName,
    category_id: categoryObj._id,
  };

  try {
    const newMenuItem = await MenuItem.findOneAndUpdate(query, update, options);

    await MenuItemVariant.deleteMany({ menuItem_id: newMenuItem._id });
    await Extra.deleteMany({ menuItem_id: newMenuItem._id });
    await AditionalOption.deleteMany({ menuItem_id: newMenuItem._id });

    if (variants && variants.length > 0) {
      variants.forEach((variant) =>
        newMenuItemVariant(variant, newMenuItem._id)
      );
    }
    if (extras && extras.length > 0) {
      extras.forEach((extra) => newExtra(extra, newMenuItem._id));
    }
    if (aditionalOptions && aditionalOptions.length > 0) {
      aditionalOptions.forEach((aditionalOption) =>
        newAditionalOption(aditionalOption, newMenuItem._id)
      );
    }

    const successResponse = {
      message: `Se ha subido con exito el ${newMenuItem.name}`,
      id: newMenuItem._id,
    };

    console.log(successResponse);
    res.status(200).send(successResponse);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const getAllMenuItems = async (req, res) => {
  const allMenuItems = await MenuItem.find({});
  const completeMenuItems = await Promise.all(
    allMenuItems.map(async (item) => await completeMenuItem(item._id))
  );
  res.send(completeMenuItems);
};

const completeMenuItem = async (menuItem_id) => {
  const menuItem = await MenuItem.findById(menuItem_id);

  const variants = await MenuItemVariant.find({ menuItem_id: menuItem._id });
  const extras = await Extra.find({ menuItem_id: menuItem._id });
  const aditionalOptions = await AditionalOption.find({
    menuItem_id: menuItem._id,
  });

  const category = await Category.findById(menuItem.category_id);

  const {
    _id,
    token,
    category_id,
    description,
    imgURL,
    name,
    posibleCourseMoments,
    tags,
  } = menuItem;

  return {
    _id,
    name,
    token,
    description,
    category,
    imgURL,
    posibleCourseMoments,
    tags,
    variants,
    extras,
    aditionalOptions,
  };
};

const getAllMenuItemDataById = async (req, res) => {
  try {
    res.send(completeMenuItem(req.params.id));
  } catch (error) {
    res.status(400).send("No existe ese plato");
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.deleteOne({ _id: req.params.id });
    console.log({ message: "Se ha eliminado con exito" });
    return res.send({ message: "Se ha eliminado con exito" });
  } catch (error) {
    console.log({ error });
    return res.send(error);
  }
};

module.exports = {
  newMenuItem,
  getAllMenuItems,
  getAllMenuItemDataById,
  deleteMenuItem,
};
