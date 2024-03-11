import IncorrectRequest from './IncorrectRequest.js'

class ValidationError extends IncorrectRequest {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join(', ')
    super(`Invalid request data: ${errorMessages}`)
  }
}

export default ValidationError