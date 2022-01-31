const MenuItemVariant = require("../models/MenuItemVariant");

const newMenuItemVariant = async (variantReq, menuItem_id) => {
  const menuItemVariant = new MenuItemVariant({
    ...variantReq,
    menuItem_id: menuItem_id

  });
  try {
    const savedMenuItemVariant = await menuItemVariant.save();

    console.log(`Cargada la variante ${savedMenuItemVariant.name} ${savedMenuItemVariant._id}`);
  } catch (e) {
    console.log(e);
  }
};



module.exports = { newMenuItemVariant };
