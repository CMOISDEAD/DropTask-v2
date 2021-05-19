const mysql = require('mysql')
const { database } = require('./keys')
const pool = mysql.createConnection(database)

pool.connect((err) => {
  err ? console.log(err) : console.log('connected')
})

module.exports = pool