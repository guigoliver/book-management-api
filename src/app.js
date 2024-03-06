import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'

const conexao = await conectaDatabase()

conexao.on('error', (err) => {
  console.error('erro de conexão: ', err)
})

conexao.once('open', () => {
  console.log('Conectado com sucesso ao banco de dados!')
})

const app = express()
routes(app)

export default app