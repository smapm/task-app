const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async(req,res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/tasks', auth, async(req,res) =>{
    const match = {};
    const sort = {};
    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }
    if(req.query.sortBy){
        let params = req.query.sortBy.split(':');
        sort[params[0]] = params[1] === 'desc' ? -1 : 1;
    }
    try{
        const user = await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(user.tasks);
    }catch(e){
        res.status(500).send();
    }
});

router.get('/tasks/:id', auth, async(req,res) =>{
    const _id = req.params.id;
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send();
          }
          res.send(task);
    }catch(e){
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async(req,res) =>{
    const requestedUpdate = Object.keys(req.body);
    const possibleUpdates = ['description', 'completed'];
    const isUpdatePossible = requestedUpdate.every((prop) => possibleUpdates.includes(prop));
    if(!isUpdatePossible){
        return res.status(400).send({"error": "Cannot update data"});
    }
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        requestedUpdate.forEach((param) => task[param] = req.body[param]);
        await task.save();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', auth, async(req,res) =>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }    
});

module.exports = router;