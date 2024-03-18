import NotFound from '../errors/NotFound.js'
import { authors, books } from '../models/index.js'

class BookController {

  static listBooks = async (req, res) => {
    try {
      const booksList = await books.find({})
      res.status(200).json(booksList)            
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` })
    }
  }

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id
      const foundBook = await books.findById(id)
        .populate('author', 'name')
        .exec()
      if (foundBook !== null) {
        res.status(200).json(foundBook)
      } else {
        next(new NotFound('Book not found.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static addBook = async (req, res, next) => {    
    try {
      const newBook = new books(req.body)
      const resultBook = await newBook.save()
      res.status(201).json({ message: 'Book successfully created', livro: resultBook})            
    } catch (error) {
      next(error)
    }
  }

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id
      const foundBook = await books.findByIdAndUpdate(id, req.body)
      
      if (foundBook !== null) {
        res.status(200).json({message: 'Book updated'})
      } else {
        next(new NotFound('Book not found.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id
      const foundBook = await books.findByIdAndDelete(id)

      if (foundBook !== null) {
        res.status(200).json({message: 'Book deleted'})
      } else {
        next(new NotFound('Book not found.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static listBooksByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query) 

      if (search !== null) {
        const booksFound = await books
          .find(search)
          .populate('author')
        res.status(200).json(booksFound)
      } else {
        res.status(200).send([])
      }                
    } catch (error) {
      next(error)
    }
  }  
}

async function processSearch(params) {
  const { publisher, title, minPages, maxPages, authorName } = params
  
  let search = {}
  if (publisher) search.publisher = publisher
  if (title) search.title = new RegExp(title, 'i')

  if (minPages || maxPages) search.numberOfPages = {}
  if (minPages) search.numberOfPages.$gte = { minPages }
  if (maxPages) search.numberOfPages.$lte = { maxPages }

  if (authorName) {
    const author = await authors.findOne({ name: authorName})
    if (author !== null) {      
      search.author = author._id
    } else {
      search = null
    }    
  }
  
  return search
}

export default BookController
