const repository = require("./getConfig.repository");

async function configService(req) {
  const repositoryResponse = await repository.configRepository(req);
  return repositoryResponse;
}

module.exports = {
  configService,
};
