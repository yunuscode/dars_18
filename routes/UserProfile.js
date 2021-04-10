const router = require('express').Router()
const users = require('../data')
const upload = require('express-fileupload')
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use(AuthMiddleware.middleware)

router.get('/:id', (req, res) => {
    let { id } = req.params

    let photoPath = path.join(__dirname, "..", "public", "images", `${id}.jpg`)

    let fileExists = fsSync.existsSync(photoPath)

    let user = findUser(id)

    if(!user){
        res.redirect('/')
        return
    }

    res.render("profile", {
        photo: fileExists ? '/images/' + id + ".jpg" : 'https://via.placeholder.com/400',
        ...req.user,
        profile: {
            ...user
        }
    })
})

router.post('/photo', upload(), async (req, res) => {
    if(req?.files?.photo){
        let photoPath = path.join(__dirname, "..", "public", "images", `${req.user.id}.jpg`)
        await fs.writeFile(photoPath, req.files?.photo?.data)
    } else {
        res.send({
            error: true
        })
        return
    }
    res.send({
        ok: true
    })
})


module.exports = {
    path: "/user",
    router: router
}

function findUser (id){
    return users.find(user => user.id == id)
}