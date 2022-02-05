const AditionalOption = require("../models/AditionalOption");

const newAditionalOption = async (aditionalOptionReq, menuItem_id) => {
  const aditionalOption = new AditionalOption({
    ...aditionalOptionReq,
    menuItem_id: menuItem_id,
  });
  try {
    const savedAditionalOption = await aditionalOption.save();

    console.log(`Cargado la optcion adicional  ${savedAditionalOption.name}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { newAditionalOption };
