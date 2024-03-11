import books from '../models/Book.js'

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
      res.status(200).json(foundBook)
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
      await books.findByIdAndUpdate(id, req.body)
      res.status(200).json({message: 'Book updated'})            
    } catch (error) {
      next(error)
    }
  }

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id
      await books.findByIdAndDelete(id)
      res.status(200).json({message: 'Book deleted'})            
    } catch (error) {
      next(error)
    }
  }

  static listBooksByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher
      const booksFound = await books.find({ 'publisher': publisher })
      res.status(200).json(booksFound)            
    } catch (error) {
      next(error)
    }
  }
}

export default BookController
