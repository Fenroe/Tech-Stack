const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BrandSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  date_founded: {type: Date},
  description: {type: String, maxLength: 250}
})

BrandSchema
.virtual('url')
.get(function () {
  return `/brands/${this._id}`
})

BrandSchema
.virtual('year_founded_formatted')
.get(function () {
  return `NOT IMPLEMENTED YET ${this.year_founded}`
})

module.exports = mongoose.model('Brand', BrandSchema)
