require("dotenv").config();
const OpenAI = require("openai");
const { getMessages, setMessages } = require("../configuration/db");

class OpenAIClass {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.API_KEY });
  }

  async ask(prompt, userUUID, messageUUID) {
    try {
      const message = await getMessages(userUUID, messageUUID);
      message.messages.push({ role: "user", content: prompt });
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: message.messages,
      });
      message.messages.push({
        role: "system",
        content: response.choices[0].message.content,
      });
      console.log("message", message);
      await setMessages(message, userUUID);
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error with OpenAI API request:", error);
      throw new Error("Failed to retrieve response from OpenAI");
    }
  }
}

module.exports = OpenAIClass;
