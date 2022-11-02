const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const db = mongoose.connection
const User = require('../user')
const Record = require('../record')


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
    categoryId: 4
  },
  {
    name: "公車費",
    date: "2022-11-2",
    amount: 12,
    categoryId: 2
  },
  {
    name: "晚餐",
    date: "2022-11-2",
    amount: 300,
    categoryId: 4
  },
  {
    name: "買傢俱",
    date: "2022-10-15",
    amount: 3500,
    categoryId: 1
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running recordSeeder!')
  Promise.all(
    SEED_USER.map(user => {
      const { name, email, password } = user
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })
      .then(user => {
        const userId = user._id
        return Promise.all(
          SEED_RECORDS.map(record => {
            return Record.create({
              ...record,
              userId
            })
          })
        )
      })
    })
  )
  .then(() => {
    console.log('recordSeeder is done!')
    process.exit()
  })
  .catch(err => console.log(err))
  .finally(() => db.close)
})