const { config } = require("../../configuration/db");

async function configRepository() {
  try {
    return await config();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  configRepository,
};
