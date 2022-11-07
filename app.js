const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const port = process.env.PORT

app.engine('handlebars', exphbs({
   defaultLayout: 'main',
   helpers: { //helpers參考同學做法
     dateHandler(date){
       let withoutTime = new Date(date).toLocaleDateString() // 參考網路資料https://ithelp.ithome.com.tw/articles/10283567
       return withoutTime
     }
   } 
  }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride("_method"))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`The project is running on http://localhost:${PORT}.`)
})