require("dotenv").config();
const OpenAI = require("openai");

class OpenAIClass {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.API_KEY });
  }

  async ask(prompt) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error with OpenAI API request:", error);
      throw new Error("Failed to retrieve response from OpenAI");
    }
  }
}

module.exports = OpenAIClass;
