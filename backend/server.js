const express = require('express')
const pool  = require('./db')
const port = 1701

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})
app.post('/',(req,res) => {
    const { name, location} = req.body
    res.sendStatus(200).send({message: `Hello ${name} from ${location}`})
})

app.get('/setup', async(req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS moveout (id SERIAL PRIMARY KEY, name VARCHAR(100), location VARCHAR(100))')
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log('Server has started on port:',port))