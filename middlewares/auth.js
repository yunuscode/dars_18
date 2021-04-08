const users = require('../data')
const { checkToken } = require('../modules/jwt')

module.exports = async (req, res, next) => {
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

    next()
}

function findUser (id){
    return users.find(user => user.id == id)
}