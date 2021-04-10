const router = require('express').Router()

const { generateHash } = require('../modules/crypt')

const { createUser } = require('../models/UserModel')


router.get('/', (req, res) => {
    res.render('registration', {
        title: "Registration Page",
        path: "/registration",
        error: "",
        user_name: req.user?.name,
        email: req.user?.email,
    })
})

router.post('/', async (req, res) => {
    try {
        let {
            email,
            name,
            password
        } = req.body
        if (!(email && name && password)) throw ("Fields aren't completed")

        password = await generateHash(password)

        await createUser(email, name, password )

        res.redirect('/login')

    } catch (e) {
        res.render('registration', {
            title: "Registration Page",
            path: "/registration",
            error: e + "",
            user_name: req.user?.name,
            email: req.user?.email,
        })
    }
})

module.exports = {
    path: "/registration",
    router: router
}