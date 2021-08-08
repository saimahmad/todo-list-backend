const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    //res.send(req.body)
    const user = new User(req.body);
    user.status(201).save().then((data) => [
        res.send(user)
    ]).catch((error) => {
        res.status(400).send(error.message)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

app.get('/user/:id', (req,res) => {
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

app.post('/tasks', async (req, res) => {
    console.log(req.body)
    //res.send(req.body)
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task)
    }catch(error) {
        res.status(400).send(error.message)
    }

})

app.get('/tasks',async (req, res) => {
    try{
        let data = await Task.find({});
        res.send(data)
    }catch(error) {
        res.status(400).send(error.message)
    }
})

app.get('/task/:id',async (req, res) => {
    try{
        let _id = req.params.id;
        let data = await Task.findOne({_id:_id});
        if(!data) {
            res.status(404).send();
            return;
        }
        res.send(data);
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.patch('/task/:id',async (req,res) => {
    try{    
        let body = req.body;
        let id = req.params.id;
        let task = await Task.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        res.send(task);
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.delete('/task/:id',async (req,res) => {
    try {
        let id = req.params.id;
        let task = await Task.findByIdAndDelete(id);
        if(!task) {
            res.status(404).send({error: "task not found"})
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})