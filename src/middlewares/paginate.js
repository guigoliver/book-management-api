import IncorrectRequest from '../errors/IncorrectRequest.js'

async function paginate(req, res, next) {
  try {
    let { pageSize = 5, pageIndex = 1, ordination = '_id:-1' } = req.query

    let [orderByField, order] = ordination.split(':')

    pageSize = parseInt(pageSize)
    pageIndex = parseInt(pageIndex)
    order = parseInt(order)

    const result = req.result

    if (pageSize > 0 && pageIndex > 0) {
      const paginatedResult = await result.find()
        .sort({ [orderByField]: order})
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .exec()

      res.status(200).json(paginatedResult) 
    } else {
      next(new IncorrectRequest('Page size and page index must be greater than 0.'))
    }      
  } catch (error) {
    next(error)
  }
}

export default paginate
