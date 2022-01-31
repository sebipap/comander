const Extra = require("../models/Extra");
const MenuItemVariant = require("../models/MenuItemVariant");

const newExtra = async (extraReq, menuItem_id) => {
  const extra = new Extra({
    ...extraReq,
    menuItem_id: menuItem_id

  });
  try {
    const savedExtra = await extra.save();

    console.log(`Cargado el extra  ${savedExtra.name} ${savedExtra._id}`);
  } catch (e) {
    console.log(e);
  }
};



module.exports = { newExtra };
