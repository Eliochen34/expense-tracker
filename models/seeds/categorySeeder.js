const Category = require('../category')
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const categoryData = [
  {
    id: 1,
    name: "家居物業",
    iconType: "home"
  },
  {
    id: 2,
    name: "交通出行",
    iconType: "shuttle-van" 
  },
  {
    id: 3,
    name: "休閒娛樂",
    iconType: "grin-beam"
  },
  {
    id: 4,
    name: "餐飲食品",
    iconType: "utensils"
  },
  {
    id: 5,
    name: "其他",
    iconType: "pen"
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running categorySeeder')
  Promise.all(
    categoryData.map(category => {
      const { id, name, iconType } = category
      return Category.create({ id, name, iconType })
        .then(() => {
          console.log('categorySeeder is done!')
          process.exit()
        })
    })
    
  )
})