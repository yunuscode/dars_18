const router = require('express').Router()

const { findUser } = require('../models/UserModel')

const {
    confirmHash
} = require('../modules/crypt')

const {
    generateToken
} = require('../modules/jwt')



router.get('/', (req, res) => {
    res.render('login', {
        title: "Login Page",
        path: "/login",
        error: "",
        user_name: req.user?.name,
        email: req.user?.email,
    })
})


router.post('/', async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body
        if (!(email && password)) throw 'Email or Password not found'
        let user = await findUser(email)
        if (!user) throw 'User not found'
        let isTrust = await confirmHash(password, user.password)
        if(!isTrust) throw 'Password is incorrect'
        let token = generateToken({ email: user.email })

        res
            .cookie('token', token)
            .redirect('/')
    } catch (e) {
        res.render('login', {
            title: "Login Page",
            path: "/login",
            error: e + "",
            user_name: req.user?.name,
            email: req.user?.email,
        })
    }
})

module.exports = {
    path: "/login",
    router: router
}
