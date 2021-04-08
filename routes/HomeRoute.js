const router = require('express').Router()
const users = require('../data')


router.get('/', (req, res) => {
    console.log(req.user);
    res.render('index', {
        title: "HomePage",
        path: "/",
        user_name: req.user?.name,
        email: req.user?.email,
    })
})

module.exports = {
    path: "/",
    router: router
}