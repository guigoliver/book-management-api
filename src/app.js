import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import handle404 from './middlewares/handle404.js'

const connection = await conectaDatabase()

connection.on('error', (err) => {
  console.error('connection failed: ', err)
})

connection.once('open', () => {
  console.log('Connected to database!')
})

const app = express()
routes(app)

app.use(handle404)

//ERROR MIDDLEWARE 
// eslint-disable-next-line no-unused-vars
app.use(errorHandler)

export default app