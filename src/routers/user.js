const express = require('express')
const User = require('../models/user')

const router = express.Router();

router.post('/users',async (req, res) => {
    //console.log(req.body)
    //res.send(req.body)
    try{
        const user = new User(req.body);
        await user.generateAuthToken();
        //await user.save();
        res.status(201).send(user);
    }catch(error) {
        res.status(400).send(error.message)
    }
})

router.post('/users/login',async (req,res) => {
    try {
        const user  = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user)
        const token = await user.generateAuthToken()
        res.send({user: user,token:token})
    }catch(error) {
        res.status(400).send(error.message)
    }
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