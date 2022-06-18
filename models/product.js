const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ProductSchema = new Schema({
  name: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
  price: {type: Number, required: true},
  in_stock: {type: Number, required: true},
  description: {type: String, required: true}
})

ProductSchema
.virtual('url')
.get(function () {
  return `/products/${this._id}`
})

ProductSchema
.virtual('price_formatted')
.get(function () {
  return `$${this.price / 100}`
})

ProductSchema
.virtual('in_stock_formatted')
.get(function () {
  if (this.in_stock > 10) return 'More than 10 in stock'
  if (this.in_stock > 0) return `${this.in_stock} left in stock`
  return 'Out of stock'
})

module.exports = mongoose.model('Product', ProductSchema)
