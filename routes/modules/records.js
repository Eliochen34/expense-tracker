const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增功能
router.post('/', (req, res) => {
  const userId = req.user._id
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 檢視單一支出
// router.get('/:restaurant_id', (req, res) => {
//   const _id = req.params.restaurant_id
//   const userId = req.user._id
//   return Restaurant.findOne({ _id, userId })
//     .lean()
//     .then(restaurant => res.render('show', { restaurant }))
//     .catch(err => {
//       console.log(err)
//       res.render('error')
//     })
// })

// 編輯頁面
router.get('/:record_id/edit', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 更新功能
router.put('/:record_id', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id

  return Record.findByIdAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 刪除功能
router.delete('/:record_id', (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id

  return Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})


module.exports = router