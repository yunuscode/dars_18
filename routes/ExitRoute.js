const router = require('express').Router()
const users = require('../data')


router.get('/', (req, res) => {
    res
        .clearCookie('token')
        .redirect('/')
})

module.exports = {
    path: "/exit",
    router: router
}