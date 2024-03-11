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

  static listAuthorById =  async (req, res, next) => {
    try {
      const id = req.params.id
      const foundAuthor = await authors.findById(id)
      if (foundAuthor !== null) {
        res.status(200).json(foundAuthor)
      } else {
        res.status(404).json({ message: 'Author not found' })
      }
    } catch (error) {
      next(error)
    }
  }

  static addAuthor = async (req, res, next) => {
    try {
      const newAuthor = await authors.create(req.body)            
      res.status(201).json({ message: 'Successful created', author: newAuthor})            
    } catch (error) {
      next(error)
    }
  }

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id
      await authors.findByIdAndUpdate(id, req.body)
      res.status(200).json({message: 'Author updated'})            
    } catch (error) {
      next(error)
    }
  }

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id
      await authors.findByIdAndDelete(id)
      res.status(200).json({message: 'Author deleted'})            
    } catch (error) {
      next(error)
    }
  }
}

export default AuthorController
