import ChatOpenAI from "langchain/chat_models/openai";
import "dotenv/config";


const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
});

export default model;