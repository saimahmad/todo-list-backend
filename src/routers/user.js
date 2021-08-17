const express = require('express')
const User = require('../models/user')

const router = express.Router();

router.post('/users', (req, res) => {
    console.log(req.body)
    //res.send(req.body)
    const user = new User(req.body);
    user.status(201).save().then((data) => [
        res.send(user)
    ]).catch((error) => {
        res.status(400).send(error.message)
    })
})

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

router.get('/user/:id', (req,res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if(!user) {
            res.status(404).send();
            return;
        }
        res.send(user);
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

module.exports = router;