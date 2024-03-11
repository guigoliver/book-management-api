import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const connection = await conectaDatabase()

connection.on('error', (err) => {
  console.error('connection failed: ', err)
})

connection.once('open', () => {
  console.log('Connected to database!')
})

const app = express()
routes(app)

//ERROR MIDDLEWARE 
// eslint-disable-next-line no-unused-vars
app.use(errorHandler)

export default app