const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
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
      .find({ key: uuid.id || uuid }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    if (!user || user.length == 0) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    return new Error(error);
  }
}

async function getMessages(userUUID, messageUUID) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const user = await collection
      .find({ key: userUUID }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    if (!user || user.length == 0) {
      throw new Error("User not found");
    }
    const message = user[0].conversations.find((c) => c.key === messageUUID);
    if (!message || message.length === 0) throw new Error("Message not found");
    return message;
  } catch (error) {
    console.log("error", error);
    return new Error("Failed to fetch from DB");
  }
}

async function setMessages(data, uuid) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const user = await collection
      .find({ key: uuid }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    const index = user[0].conversations.findIndex((c) => c.key === data.key);
    user[0].conversations[index] = data;
    await collection.updateOne(
      { key: uuid },
      { $set: { conversations: user[0].conversations } }
    );
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

async function setConversation(uuid, title, history) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const user = await getUser(uuid);
    const conversationUUID = uuidv4();
    const object = [
      ...user[0].conversations,
      { key: conversationUUID, name: title, messages: [], history: history },
    ];
    await collection.updateOne(
      { key: uuid },
      { $set: { conversations: object } }
    );
    return conversationUUID;
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

async function setHistory(uuid, history, messageUUID) {
  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const collection = database.collection(process.env.USER_COLLECTION);
    const user = await collection
      .find({ key: uuid }, { projection: { _id: 0, registered: 0 } })
      .toArray();
    const index = user[0].conversations.findIndex((c) => c.key === messageUUID);
    user[0].conversations[index].history = history;
    await collection.updateOne(
      { key: uuid },
      { $set: { conversations: user[0].conversations } }
    );
  } catch (error) {
    return new Error("Failed to fetch from DB");
  }
}

module.exports = {
  getAllUsers,
  config,
  addUser,
  updateUser,
  getUser,
  getMessages,
  setMessages,
  setConversation,
  setHistory,
};
