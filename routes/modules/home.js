const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Category = require('../../models/category')
const caculateTotalAmount = require('../../utility/caculate')

// function caculateTotalAmount(records){
//   let totalAmount = 0
//   records.forEach(record => {
//     totalAmount += record.amount
//   })
//   return totalAmount
// }

router.get('/', (req, res) => {
  const userId = req.user._id
  const categories = []
  // 找出所有類別預計放入index渲染畫面
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .then(() => {
      Records.find({ userId })
        .populate('categoryId')
        .lean()
        // .sort(sorting(req.query.sort))
        .then(records => {
          // let totalAmount = 0
          // records.forEach(record => {
          //   totalAmount += record.amount
          // })
          let totalAmountRender = caculateTotalAmount(records)
          res.render('index', { records, totalAmountRender, categories })
        })
        .catch(err => {
          console.log(err)
          res.render('error')
        })
    })
})

router.post('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.sort
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .then(() => {
      Records.find({ userId, categoryId })
        .populate('categoryId')
        .lean()
        .then(records => {
          let totalAmountRender = caculateTotalAmount(records)
          res.render('index', { records, totalAmountRender, categories })
        })
        .catch(err => {
          console.log(err)
          res.render('error')
        })
    })
}) 


module.exports = router