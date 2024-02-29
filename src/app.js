import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'

const conexao = await conectaDatabase()

conexao.on("error", (err) => {
    console.error("erro de conexão: ", err)
})

conexao.once("open", () => {
    console.log("Conectado com sucesso ao banco de dados!")
})

const app = express()
routes(app)

// ROUTES

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(204).send("Livro excluído com sucesso!")
})

export default app