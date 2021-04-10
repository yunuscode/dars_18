const router = require('express').Router()
const moment = require('moment')
moment.locale("uz-latn");

const messages = require('../messages')
const users = require('../data')
const { v4: uuidv4 } = require('uuid');

const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use(AuthMiddleware.middleware)

router.get('/', (req, res) => {
    let messagess = messages.reverse()
    messagess = messagess.map(message => {
        return {
            ...message,
            user: users.find(user => user.id == message.user),
            time: moment(message.time).format('LLL')
        }
    })
    res.render('chat', {
        ...req.user,
        path: "/chat",
        messages:messagess
    })
})

router.post('/', (req, res) => {
    let messagess = messages.reverse()
    messagess = messagess.map(message => {
        return {
            ...message,
            user: users.find(user => user.id == message.user),
            time: moment(message.time).format('LLL')
        }
    })
    try {
        let { message } = req.body
        if(!message) throw ("Message not defined")
        message = message.trim()
        if(!message.length) throw ("Message Empty")
        if(!message.length > 1024) throw ("Message Too long")
        messages.push({
            body: message,
            id: uuidv4(),
            user: req.user.id,
            time: Date.now()
        })
        console.log(messages);
        res.redirect('/chat')
    }
    catch(e){
        res.render('chat', {
            ...req.user,
            error: e + "",
            messages: messagess
        })
    }
})


module.exports = {
    path: "/chat",
    router: router
}