const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  iconType: {
    type: String,
    required: true
  },
  creatAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', categorySchema)