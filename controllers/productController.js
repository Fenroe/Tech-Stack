let Product = require('../models/product')
let Brand = require('../models/brand')
let Category = require('../models/category')

const async = require('async')

exports.productList = (req, res, next) => {
  Product.find()
    .sort({name: 1})
    .exec((err, listProducts) => {
      if (err) return next(err)
      res.render('product_list', { title: 'Product List', productList: listProducts })
    })
}

exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate('brand')
    .populate('category')
    .exec((err, product) => {
      if (err) return next(err)
      if (product == null) {
        const err = new Error('Product not found')
        err.status = 404
        return next(err)
      }
      res.render('product_detail', { title: product.name, product: product })
    })
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
