const mysql = require('mysql')
const pool = mysql.createConnection({
  host: 'localhost',
  database: 'tasks',
  user: 'camilo',
  password: 'Imnotafraid31'
})

pool.connect((err) => {
  err ? console.log(err) : console.log('connected')
})

module.exports = pool