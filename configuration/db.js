const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function getAllUsers() {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const result = await collection
      .find({}, { projection: { _id: 0, registered: 0 } })
      .limit(50)
      .toArray();
    return result;
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

async function config() {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.CONFIG_COLLECTION);
    const result = await collection
      .find({}, { projection: { _id: 0, registered: 0 } })
      .toArray();
    return result;
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

module.exports = { getAllUsers, config };
