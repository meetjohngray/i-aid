import 'dotenv/config'
import { Router } from 'express'
import { Configuration, OpenAIApi } from 'openai'


const router = Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const conversation = [
  { role: 'system', content: 'You are a helpful assistant.' }
];

async function getCompletion(prompt: string) {
    conversation.push({ role: 'user', content: prompt });

    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversation,
    });

    const data = chatCompletion.data.choices[0].message;
    conversation.push({ role: 'assistant', content: data.content });

    return data;
}

router.post('/', async (req, res) => {
  const prompt = req.body.question;
  
  try {
    const data = await getCompletion(prompt);
    res.status(200).json({ data });
  } catch (error: unknown) {
    if (error instanceof Error) { 
      console.log(error.message);
    } else {    
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
});


export default router
