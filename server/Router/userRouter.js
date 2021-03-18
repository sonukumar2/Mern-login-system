const express = require('express');
const User = require('../models/userSchema');

const router = express();

router.post('/', async (req, res)=>{
    try {
        const {email, password, cpassword} = req.body;
        if(!email || !password || !cpassword) {
            res.status(400).json({msg: "Enter Details"});
        }
        
        if(password.length < 6) {
            res.status(400).json({msg: "Enter Long Password"});
        }

        if(password !== cpassword) {
            res.status(400).json({msg: "Password MisMatch"});
        }

        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            res.status(400).json({msg: "Email Already Exist"});
        }

        
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;