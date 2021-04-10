const mongoose = require('mongoose')

const url = `mongodb+srv://muhammad:uzuzuzuz@najottalim.hg5ot.mongodb.net/instagram`

async function client () { 
    return await mongoose.connect(url, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = client