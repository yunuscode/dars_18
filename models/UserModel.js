const client = require('../modules/mongo')
const { Schema } = require('mongoose')

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

async function UserModel(){
    let db = await client()
    let model = await db.model('users', UserSchema)
    return model
}


async function createUser(email, name, password) {
    let model = await UserModel()
    await model.create({ name, email, password })
}

async function findUser(email){
    let model = await UserModel()
    let response = await model.findOne({ email: email })
    return response
}

module.exports = {
    createUser,
    findUser
}