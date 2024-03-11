import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, 'Title is required'] },
  publisher: { type: String, required: [true, 'Publisher is required'] },
  cost: { type: Number },
  pages: { type: Number },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: [true, 'Author is required']},
}, { versionKey: false })

const books = mongoose.model('books', livroSchema)

export default books