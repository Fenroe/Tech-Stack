const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

router.get('/', productController.productList)

router.get('/create', productController.productCreateGet)

router.post('/create', productController.productCreatePost)

router.get('/:id/delete', productController.productDeleteGet)

router.post('/:id/delete', productController.productDeletePost)

router.get('/:id/update', productController.productUpdateGet)

router.post('/:id/update', productController.productUpdatePost)

router.get('/:id', productController.productDetail)

module.exports = router
