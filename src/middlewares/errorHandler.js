import mongoose from 'mongoose'

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Invalid request data' })
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join(', ')
    res.status(400).json({ message: `Invalid request data: ${errorMessages}` })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default errorHandler