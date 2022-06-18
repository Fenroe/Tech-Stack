let Product = require('../models/product')

exports.productList = (req, res, next) => {
  Product.find()
    .sort({name: 1})
    .exec((err, listProducts) => {
      if (err) return next(err)
      res.render('product_list', { title: 'Product List', productList: listProducts })
    })
}

exports.productDetail = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See product page')
}

exports.productCreateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See product create form')
}

exports.productCreatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for product create form POST')
}

exports.productDeleteGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See product delete form')
}

exports.productDeletePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for product delete form POST')
}

exports.productUpdateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See product update form')
}

exports.productUpdatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for product update form POST')
}
