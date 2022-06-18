const Product = require('../models/product')
const Brand = require('../models/brand')
const Category = require('../models/category')

const async = require('async')

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
  res.send('NOT IMPLEMENTED: See brand create form')
}

exports.brandCreatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Logic for brand create form POST')
}

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
