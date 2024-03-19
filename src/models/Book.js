import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

livroSchema.plugin(autopopulate)
const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, 'Title is required'] },
  publisher: { type: String, required: [true, 'Publisher is required'] },
  cost: { type: Number },
  pages: { type: Number,
    min: [10, 'Book must have at least 10 pages'], 
    max: [5000, 'Book must have at most 5000 pages'] 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'authors', 
    required: [true, 'Author is required'],
    autopopulate: true,
  },
}, { versionKey: false })

const books = mongoose.model('books', livroSchema)

export default books