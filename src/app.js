import express from 'express'
import conectaDatabase from './config/dbConnect.js'
import livro from './models/Livro.js'

const conexao = await conectaDatabase()

conexao.on("error", (err) => {
    console.error("erro de conexão: ", err)
})

conexao.once("open", () => {
    console.log("Conectado com sucesso ao banco de dados!")
})

const app = express()
app.use(express.json())

// ROUTES
app.get("/", (req, res) => {    
    res.status(200).send("Curso de Node.js")
})

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({})
    res.status(200).json(listaLivros)
})

app.get("/livros/:id", async (req, res) => {
    const livro = await livro.findById(req.params.id)
    res.status(200).json(livro)
})

app.post("/livros", (req, res) => {
    const livro = req.body
    livros.push(livro)
    res.status(201).send("Livro cadastrado com sucesso!")
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros[index])
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(204).send("Livro excluído com sucesso!")
})

export default app