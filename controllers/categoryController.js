const Product = require('../models/product')
const Brand = require('../models/brand')
const Category = require('../models/category')

const async = require('async')

const { body,validationResult } = require("express-validator")

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
  res.render('category_form', { title: 'Add New Category' })
}

exports.categoryCreatePost = [
  body('name', 'Category name required').trim().isLength({ min: 1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const category = new Category({ name: req.body.name })
    if (!errors.isEmpty()) {
      res.render('category_form', { title: 'Add New Category', category: category, errors: errors.array()})
      return
    }
    else {
      Category.findOne({ 'name': req.body.name })
        .exec((err, foundCategory) => {
          if (err) return next(err)
          if (foundCategory) {
            res.redirect(foundCategory.url)
          }
          else {
            category.save((err) => {
              if (err) return next(err)
              res.redirect(category.url)
            })
          }
        })
    }
  }
]

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
