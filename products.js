require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.NAME,
    host: process.env.HOST,
    database: process.env.NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

const getProducts = (req, res) => {
    pool.query('SELECT * FROM lager', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getProductBySku = (req, res) => {
    const sku = parseInt(req.params.sku)
    pool.query('SELECT * FROM lager WHERE sku = $1', [sku], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createProduct = (req, res) => {
    const { namn, pris, sku } = req.body
    pool.query('INSERT INTO lager (namn, pris, sku) VALUES ($1, $2, $3)', [namn, pris, sku], (err, result) => {
        if (err) {
            throw err
        }
        res.status(201).send('Produkten med ID: ${result.insertId} har lagts till i lagret')
    })
}

const deleteProduct = (req, res) => {
    const sku = parseInt(req.params.sku)
    pool.query('DELETE FROM lager WHERE sku = $1', [sku], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Produkten med SKU: ${sku} raderad från lagret`)
    })
}

module.exports = {
    getProducts,
    getProductBySku,
    createProduct,
    deleteProduct,
}