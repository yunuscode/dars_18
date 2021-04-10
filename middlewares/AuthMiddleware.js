const users = require('../data')
const { checkToken } = require('../modules/jwt')

module.exports = {
    middleware: middleware,
    forAll: false
}

async function middleware (req, res, next) {
    let token = req.cookies?.token
    if(token){
        let user = checkToken(token)
        user = findUser(user.id)
        if(user){
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

    if(!req?.user){
        res.redirect('/')
        return
    }

    next()
}

function findUser (id){
    return users.find(user => user.id == id)
}