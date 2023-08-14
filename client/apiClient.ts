import request from 'superagent'
import { Chat } from '../models/chats'

export async function getAnswer(question: Chat[]) {
  const res = await request
    .post('/api/v1/openai')
    .send(question)
  return res
}
