import { Router } from 'express'
import { getCompletion } from '../library/openai'

const router = Router()

router.post('/', async (req, res) => {
  const chats  = req.body
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
