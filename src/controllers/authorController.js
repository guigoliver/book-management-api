import { authors } from '../models/Author.js'

class AuthorController {

  static listAuthors = async (req, res) => {
    try {
      const foundAuthors = await authors.find({})
      res.status(200).json(foundAuthors)            
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` })
    }
  }

  static listAuthorById =  async (req, res) => {
    try {
      const id = req.params.id
      const foundAuthor = await authors.findById(id)
      res.status(200).json(foundAuthor)            
    } catch (error) {
      res.status(400).json({ message: `${error.message} - Autor não encontrado` })
    }
  }

  static addAuthor = async (req, res) => {
    try {
      const newAuthor = await authors.create(req.body)            
      res.status(201).json({ message: 'criado com sucesso', author: newAuthor})            
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failure when adding author` })
    }
  }

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id
      await authors.findByIdAndUpdate(id, req.body)
      res.status(200).json({message: 'Author updated'})            
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Update failed` })
    }
  }

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id
      await authors.findByIdAndDelete(id)
      res.status(200).json({message: 'Author deleted'})            
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Deletion failed` })
    }
  }
}

export default AuthorController
