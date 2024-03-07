import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'

const connection = await conectaDatabase()

connection.on('error', (err) => {
  console.error('connection failed: ', err)
})

connection.once('open', () => {
  console.log('Connected to database!')
})

const app = express()
routes(app)

export default app