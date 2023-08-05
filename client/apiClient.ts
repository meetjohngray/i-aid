import request from 'superagent'
import { promptData } from './components/App'

export function getAnswer(question: promptData): Promise<string> {
  return request
    .post('/api/v1/openai')
    .send(question)
    .then((res) => {
      return res.body.data.content
    })
}