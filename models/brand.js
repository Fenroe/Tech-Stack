const mongoose = require('mongoose')

const dayjs = require('dayjs')

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
.virtual('date_founded_formatted')
.get(function () {
  return `Founded ${dayjs(this.date_founded).format('MMMM YYYY')}`
})

module.exports = mongoose.model('Brand', BrandSchema)
