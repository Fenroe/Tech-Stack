const Product = require('../models/product')
const Brand = require('../models/brand')
const Category = require('../models/category')

const async = require('async')

const { body,validationResult } = require("express-validator")

exports.brandList = (req, res, next) => {
  Brand.find()
    .sort({name: 1})
    .exec((err, listBrands) => {
      if (err) return next(err)
      res.render('brand_list', { title: 'Brand List', brandList: listBrands})
    })
}

exports.brandDetail = (req, res, next) => {
  
  async.parallel({
    brand: (callback) => {
      Brand.findById(req.params.id)
        .exec(callback)
    },

    brandProducts: (callback) => {
      Product.find({'brand': req.params.id})
        .exec(callback)
    },
  }, (err, results) => {
    if (err) return next(err)
    if (results.brand == null) {
      const err = new Error('Brand not found')
      err.status = 404
      return next(err)
    }
    res.render('brand_detail', { title: results.brand.name, brand: results.brand, brandProducts: results.brandProducts })
  })
}

exports.brandCreateGet = (req, res, next) => {
  res.render('brand_form', { title: 'Add New Brand'})
}

exports.brandCreatePost = [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('date_founded', 'Invalid founding date.').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const brand = new Brand({
      name: req.body.name,
      date_founded: req.body.date_founded,
      description: req.body.description
    })
    if (!errors.isEmpty()) {
      res.render('brand_form', { title: 'Add New Brand', brand: brand, errors: errors.array() })
      return
    } else {
      Brand.findOne({ 'name': req.body.name })
        .exec((err, foundBrand) => {
          if (err) return next(err)
          if (foundBrand) {
            res.redirect(foundBrand.url)
          }
          else {
            brand.save((err) => {
              if (err) return next(err)
              res.redirect(brand.url)
            })
          }
        })
    }
  }
]

exports.brandDeleteGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See brand delete form')
}

exports.brandDeletePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for brand delete form POST')
}

exports.brandUpdateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: See brand update form')
}

exports.brandUpdatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for brand update form POST')
}
