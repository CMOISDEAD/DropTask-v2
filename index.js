// *Imports
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./src/server/config/keys')

// *Initialize
const app = express()

// *Configs
app.set("PORT", process.env.PORT || "3000")

// *Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
// app.use(session({
//   secret: 'dropdeadtask',
//   resave: false,
//   saveUninitialized: false,
//   store: new MySQLStore(database)
// }));

// *Routes
app.use(require('./src/server/routes/routes'))

// *Running server :)
app.listen(app.get("PORT"), () => {
  console.log(`server listen on port ${app.get("PORT")}`)
})