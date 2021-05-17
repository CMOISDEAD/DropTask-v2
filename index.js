// Imports
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Initialize
const app = express()

// Configs
app.set("PORT", "3000")

// Webpack config
const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(webpackDev(webpack(webpackConfig)))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use(require('./src/server/routes/routes'))

// Running serever :)
app.listen(app.get("PORT"), () => {
  console.log(`server listen on port ${app.get("PORT")}`)
})