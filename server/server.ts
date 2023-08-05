import path from 'node:path';
import express from 'express'
import cors, { CorsOptions } from 'cors'
import openAi from './routes/openai'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*' as CorsOptions))
// server.use((req, res, next) => {
//   console.log('Request!!!!', req.url);
//   next();
// });
server.use('/api/v1/openai', openAi)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
