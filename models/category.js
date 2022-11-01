const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creatAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', categorySchema)