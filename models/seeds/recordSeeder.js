const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const db = mongoose.connection
const User = require('../user')
const Record = require('../record')
const Category = require('../category')


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// 種子user資料
const SEED_USER = [
  {
    name: "seedUser",
    email: "seedUser@example.com",
    password: "12345678",
  }
]

// 種子records資料
const SEED_RECORDS = [
  {
    name: "早餐",
    date: "2022-11-2",
    amount: "55",
    categoryId: "餐飲食品"
  },
  {
    name: "公車費",
    date: "2022-11-2",
    amount: 12,
    categoryId: "交通出行"
  },
  {
    name: "晚餐",
    date: "2022-11-2",
    amount: 300,
    categoryId: "餐飲食品"
  },
  {
    name: "買傢俱",
    date: "2022-10-15",
    amount: 3500,
    categoryId: "家居物業"
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running recordSeeder!')
  Promise.all(
    Category.find()
      .then(categories => {
        SEED_RECORDS.forEach(seedRecord => {
          seedRecord.categoryId = categories.find(category => category.name === seedRecord.categoryId)._id
        })
      })
      .then(
        Promise.all(
          SEED_USER.map(user => {
            const { name, email, password } = user
            User.create({
              name,
              email,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
            })
            .then(user => {
              console.log('xxxxxxxx')
              const userId = user._id
              SEED_RECORDS.map(record => {
                const { name, date, amount, categoryId } = record
                console.log('oooooooooooo')
                return Record.create({
                  name,
                  date,
                  amount,
                  categoryId,
                  userId
                })
              })
            })
          })
        )
      )
  )
  .then(() => {
    console.log('recordSeeder is done!')
    process.exit()
  })
  .catch(err => console.log(err))
  .finally(() => db.close)
})