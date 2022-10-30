const express = require('/express')
const exphbs = require('/express-handlebars')






const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'hbs')