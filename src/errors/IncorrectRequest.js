import BaseError from './BaseError.js'

class IncorrectRequest extends BaseError {
  constructor(message = 'Incorrect request data') {
    super(message, 400)    
  }
}

export default IncorrectRequest