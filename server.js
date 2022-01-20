const express = require('express')
const bodyParser = require('body-parser')
const db = require('./products') // med Pool
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ //urlencode = space is %20
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'Testi'})
})

// med Pool

app.get('/products', db.getProducts)
app.get('/products/:sku', db.getProductBySku)
app.post('/products', db.createProduct)
app.delete('/products/:sku', db.deleteProduct)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})




/*var pgp = require('pg-promise')
var db = pgp('postgresql://opqabzxu:9b7e0cd3f2c864163205@128.214.253.167:5432/opqabzxu')

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })*/