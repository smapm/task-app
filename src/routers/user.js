const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {welcomeUser, exitUser} = require('../emails/account');
const router = new express.Router();

router.post('/users', async(req,res) =>{
    const user = new User(req.body);
    try{
        await user.save();
        welcomeUser(user.email, user.name);
        const token = await user.authenticate();
        res.status(201).send({ user, token})
    }catch(e){
        res.status(400).send(e)
    }    
});

router.get('/users/me', auth, async(req,res) =>{
        res.send(req.user);
});

router.post('/users/login', async(req,res) =>{
    try{
        const user = await User.validateAndLogin(req.body.email, req.body.password);
        const token = await user.authenticate();
        res.send({ user, token});
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async(req,res) =>{
    try{
        const user = req.user;
        user.tokens = user.tokens.filter((token) =>{
            return token.token !== req.token;
        });
        await user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async(req,res) =>{
    try{
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
});

router.patch('/users/me', auth, async(req,res) =>{
    const requestedUpdate = Object.keys(req.body);
    const possibleUpdates = ['name', 'age', 'email', 'password'];
    const isUpdatePossible = requestedUpdate.every((prop) => possibleUpdates.includes(prop));
    if(!isUpdatePossible){
        return res.status(400).send({"error": "Cannot update data"});
    }
    try{
        requestedUpdate.forEach((param)=> req.user[param] = req.body[param]);
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e)
    }
});

router.delete('/users/me', auth, async(req,res) =>{
    try{
        await req.user.remove();
        exitUser(req.user.email, req.user.name);
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true);
    }
});
router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) =>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) =>{
    res.status(500).send({error: error.message});
});

router.delete('/users/me/avatar', auth, async(req, res) =>{
    try{
        if(!req.user.avatar){
            return res.status(404).send()
        }
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

router.get('/users/:id/avatar', async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if( !user || !user.avatar){
            return res.status(404).send()
        }
        res.set('Content-Type','image/jpg');
        res.send(user.avatar);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;