import 'dotenv/config'
import { Router } from 'express'
import { Configuration, OpenAIApi } from 'openai'


const router = Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function getCompletion(prompt: any) {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant'
        },
        ...prompt,
      ]
    });
    return chatCompletion
}

router.post('/', async (req, res) => {
  const  chats  = req.body
  try {
    const result = await getCompletion(chats)
    res.status(200).json({ output: result.data.choices[0].message });
  } catch (error: unknown) {
    if (error instanceof Error) { 
      console.log(error.message);
    } else {    
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
});


export default router
