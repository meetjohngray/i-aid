import path from 'node:path';
import express from 'express'
import cors, { CorsOptions } from 'cors'
import openAiRoutes from './routes/openAiRoutes'
import bodyParser from 'body-parser';

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(bodyParser.json())
server.use(cors('*' as CorsOptions))

server.use('/api/v1/openai', openAiRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
