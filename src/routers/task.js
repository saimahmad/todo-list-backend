const express = require('express')
const Task = require('../models/task')

const router = express.Router();

router.post('/tasks', async (req, res) => {
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

router.get('/tasks',async (req, res) => {
    try{
        let data = await Task.find({});
        res.send(data)
    }catch(error) {
        res.status(400).send(error.message)
    }
})

router.get('/task/:id',async (req, res) => {
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

router.patch('/task/:id',async (req,res) => {
    try{    
        let body = req.body;
        let id = req.params.id;
        let task = await Task.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        res.send(task);
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.delete('/task/:id',async (req,res) => {
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

module.exports = router;