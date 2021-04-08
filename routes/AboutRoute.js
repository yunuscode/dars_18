const router = require('express').Router()


router.get('/', (req, res) => {
    console.log(req.cookies);
    res.render("about", {
        title: "About Page",
        path: '/about'
    })
})


module.exports = {
    path: "/about",
    router: router
}