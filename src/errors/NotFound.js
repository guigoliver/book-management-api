import BaseError from './BaseError.js'

class NotFound extends BaseError {
  constructor(message = 'Page not found') {
    super(message, 404)
  }
}

export default NotFound