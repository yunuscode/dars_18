const bcrypt = require('bcrypt')


async function generateHash(data){
    let salt = await bcrypt.genSalt(10)
    let crypt = await bcrypt.hash(data, salt)
    return crypt
}

async function confirmHash(data, hash){
    return await bcrypt.compare(data, hash)
}


module.exports = {
    confirmHash, generateHash
}