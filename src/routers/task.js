const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = express.Router();

//to save task
router.post('/tasks',auth, async (req, res) => {
    

    const task = new Task({    //adding owner field in task
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save()
        res.status(201).send(task)
    }catch(error) {
        res.status(400).send(error.message)
    }

})

//to get list of tasks of particular owner
router.get('/tasks',auth,async (req, res) => {
    try{
        let data = await Task.find({owner: req.user._id});
        res.send(data)
    }catch(error) {
        res.status(400).send(error.message)
    }
})

//to update a particular task using its's id
router.patch('/task/:id',auth, async (req,res) => {
    try{    
        const task = await Task.findOneAndUpdate({_id: req.params.id, owner: req.user._id},req.body,{new: true});
        if(!task) {
            return res.status(404).send()
        }
         res.send(task);
    }catch(error){
        res.status(500).send(error.message)
    }
})

//delete a partical task using it's id
router.delete('/task/:id',auth,async (req,res) => {
    try {
        let task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task) {
            return res.status(404).send({error: "task not found"})
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error.message);
    }
})


//changing order of task and completed status
router.post('/tasks/order',auth,async (req,res) => {
    try{
        req.body.forEach(async (task) => {
            await Task.findByIdAndUpdate(task._id,{position: task.position, completed: task.completed})
        })
        res.send()
    }catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;