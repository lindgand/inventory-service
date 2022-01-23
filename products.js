require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.NAME,
    host: process.env.HOST,
    database: process.env.NAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
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
        res.status(200).json(result.rows.length)
    })
}

const createProduct = (req, res) => {
    const { namn, pris, sku, antal } = req.body
    pool.query('INSERT INTO lager (namn, pris, sku, antal) VALUES ($1, $2, $3, $4)', [namn, pris, sku, antal], (err, result) => {
        if (err) {
            throw err
        }

        res.status(201).send(`Produkten med SKU: ${sku} har lagts till i lagret`)
    })
}

const editProduct = (req, res) => {
    const sku = parseInt(req.params.sku)
    const { antal, pris } = req.body
    pool.query('UPDATE lager SET antal = antal - $1, pris = $2 WHERE sku = $3 RETURNING antal', [antal, pris, sku], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Mängden av produkten ${sku} har ändrats. Ny saldo: ` + Object.values(result.rows[0]))
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
    editProduct,
}