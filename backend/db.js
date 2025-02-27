const { Pool } = require('pg')
const pool = new Pool({
    host: 'db',
    port: '1701',
    user: 'hs43',
    password: 'qwerty',
    database: 'db123'
})

module.exports = pool
