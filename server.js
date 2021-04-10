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
const cookieParser = require('cookie-parser');

let middlewarePath = path.join(__dirname, 'middlewares')
fs.readdir(middlewarePath, (err, files) => {
    files.forEach(file => {
        let filePath = path.join(middlewarePath, file)
        let Middleware = require(filePath)
        if(Middleware.middleware && Middleware.forAll) app.use(Middleware.middleware)
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
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