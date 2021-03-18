const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express();

router.post('/', async (req, res)=>{
    try {
        const {email, password, cpassword} = req.body;

        if(!email || !password || !cpassword) {
            res.status(400).json({msg: "Enter Details "});
        }

        if(password !== cpassword) {
            res.status(400).json({msg: "Password MisMatch"});
        }
        const existingUser = await User.findOne({email});
        
        if(existingUser) {
            res.status(400).json({msg: "Email Already Exist"});
        }
        
        // Hash the Password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(passwordHash);

        // save a new User
        const newUser = new User({
            email, passwordHash
        });
        const savedUser = await newUser.save()
        .then(result => {
            res.status(200).json({ "msg": "Successfuly Posted" })
        })
        .catch(err => {
            res.status(500).json({ "msg": "Error" })
        })

        const token = jwt.sign({
            user: savedUser._id
        },
        process.env.JWT_SECRET);


        res.cookie("token", token, {
            httpOnly: true,
        }).send();
         
    } catch (error) {
        res.status(500).json({msg:"hg diya"});
    }
})

module.exports = router;