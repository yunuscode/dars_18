const express = require('express');
const app = express()
const fs = require('fs')
const path = require('path')


// environments -- Start
require('dotenv').config()
const PORT = process.env.PORT
// environments -- End


// Listen -- Start
app.listen(PORT, _ => console.log(`SERVER READY AT http://localhost:${PORT}`))
// Listen -- End


// Middlewares -- start
const authMiddleware = require('./middlewares/auth')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(authMiddleware)
// Middlewares -- end



// Settings -- start
app.set('view engine', 'ejs')
// Settings -- end



// Routes -- Start
let routesPath = path.join(__dirname, 'routes')
fs.readdir(routesPath, (err, files) => {
    files.forEach(file => {
        let filePath = path.join(routesPath, file)
        let Route = require(filePath)
        if(Route.path && Route.router) app.use(Route.path, Route.router)
    })
})
// Routes -- End