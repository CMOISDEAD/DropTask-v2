// Imports
const path = require('path')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./src/server/config/keys')

// Initialize
const app = express()

// Configs
app.set("PORT", "3000")

// Webpack config
// const webpack = require('webpack')
// const webpackDev = require('webpack-dev-middleware')
// const webpackConfig = require('./webpack.config')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
// app.use(webpackDev(webpack(webpackConfig)))
app.use(bodyParser.json())
app.use(cors())
app.use(session({
  secret: 'dropdeadtask',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

// Routes
app.use(require('./src/server/routes/routes'))

// Running server :)
app.listen(app.get("PORT"), () => {
  console.log(`server listen on port ${app.get("PORT")}`)
})