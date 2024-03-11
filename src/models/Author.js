import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: [true, 'Name is required'] },   
  nationality: { type: String } 
}, { versionKey: false })

const authors = mongoose.model('authors', authorSchema)

export { authors, authorSchema }