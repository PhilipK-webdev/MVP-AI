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

async function addUser(data) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

async function updateUser(updateData) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const findUser = await collection
      .find({ key: updateData.key }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    if (!findUser || findUser.length == 0) {
      throw new Error("User not found");
    }
    const result = await collection.updateOne(
      { key: updateData.key },
      { $set: updateData }
    );
    return result;
  } catch (error) {
    return new Error(error);
  }
}

async function getUser(uuid) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const user = await collection
      .find({ key: uuid.id }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    if (!user || user.length == 0) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    return new Error(error);
  }
}

module.exports = { getAllUsers, config, addUser, updateUser, getUser };
