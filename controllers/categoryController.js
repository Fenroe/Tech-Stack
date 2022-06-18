const Product = require('../models/product')
const Brand = require('../models/brand')
const Category = require('../models/category')

const async = require('async')

exports.categoryList = (req, res, next) => {
  Category.find()
    .sort({name: 1})
    .exec((err, listCategories) => {
      if (err) return next(err)
      res.render('category_list', { title: 'Category List', categoryList: listCategories })
    }) 
}

exports.categoryDetail = (req, res, next) => {
  
  async.parallel({
    category: (callback) => {
      Category.findById(req.params.id)
        .exec(callback)
    },

    categoryProducts: (callback) => {
      Product.find({'category': req.params.id})
        .exec(callback)
    },
  }, (err, results) => {
    if (err) return next(err)
    if (results.category == null) {
      const err = new Error('Category not found')
      err.status = 404
      return next(err)
    }
    res.render('category_detail', { title: results.category.name, category: results.category, categoryProducts: results.categoryProducts })
  })
}

exports.categoryCreateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See category create form')
}

exports.categoryCreatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for category create form POST')
}

exports.categoryDeleteGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See category delete form')
}

exports.categoryDeletePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for category delete form POST')
}

exports.categoryUpdateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See category update form')
}

exports.categoryUpdatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for category update form POST')
}
