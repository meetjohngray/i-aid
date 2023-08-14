import 'dotenv/config'
import { Configuration, OpenAIApi,ChatCompletionRequestMessage } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function getCompletion(chats: Array<ChatCompletionRequestMessage>) {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant'
        },
        ...chats,
      ]
    });
    return chatCompletion
}