const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const bcrypt = require('bcryptjs')

const router = express.Router();

//to signup user
router.post('/users/signup',async (req, res) => {
    //console.log(req.body)
    //res.send(req.body)
    try{
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 8); //password hashing
        const token = await user.generateAuthToken();
        //await user.save();
        res.status(201).send({user: user.getPublicData(),token:token});
    }catch(error) {
        res.status(400).send(error.message)
    }
})

//to login user
router.post('/users/login',async (req,res) => {
    try {
        //console.log(req.body)
        const user  = await User.findByCredentials(req.body.email, req.body.password);
        //console.log(user)
        const token = await user.generateAuthToken()
        res.send({user: user.getPublicData(),token:token})
    }catch(error) {
        res.status(400).send(error.message)
    }
})

//to logout user
router.post('/users/logout',auth,async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        await req.user.save();
        res.send({msg:"logged out successfully"})
    }catch(error) {
        res.status(400).send(error.message)
    }
})

//to logout user from all sessions
router.post('/users/logoutAll',auth,async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send({msg:"loggout from all sessions"})
    }catch(error) {
        res.status(400).send(error.message)
    }
})

//to get information like name using auth token
router.get('/users/me',auth,(req, res) => {
    const user = req.user;
    res.send(user.getPublicData())
})

module.exports = router;