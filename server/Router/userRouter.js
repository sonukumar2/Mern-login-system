const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const router = express();

router.post('/', async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        if (!email || !password || !passwordVerify) {
            return res.status(400).json({ msg: "Enter Details " });
        }

        if (password !== passwordVerify) {
            return res.status(400).json({ msg: "Password MisMatch" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "Email Already Exist" });
        }

        // Hash the Password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(passwordHash);

        // save a new User
        const newUser = new User({
            email, passwordHash
        });
        const savedUser = await newUser.save();
        // res.status(300).json({"msg": "Successfuly Posted"});
        // .then(result => {
        //     res.status(200).json({ "msg": "Successfuly Posted" })
        // })
        const token = jwt.sign({
            user: savedUser._id
        },
            process.env.JWT_SECRET);

        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite: "none",
        }).send();

    } catch (error) {
        res.status(500).json({ msg: "hg diya" });
    }
})

// Log in
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email || !password) {
           return res.status(400).json({ "msg": "Please Enter Required fields" })
        }
        const existingUser = await User.findOne({ email:email });
        // console.log(existingUser);

        if (!existingUser) {
           return res.status(400).json({ "msg": "Not Registered" })
        }

        const pwd = await bcrypt.compare(password, existingUser.passwordHash);
        if (!pwd) {
           return res.status(401).json({ "msg": "Wrong Email and Password" })
        }
    
        // sign the token
        
        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );
        //console.log(token);
        // send the token in a HTTP-only cookie
        res
            .cookie("token", token, {
                httpOnly: true,
                secure:true,
                sameSite: "none",
            })
            .send("success");

    } catch (error) {
        res.status(500).send(error);
    }
})

// Log Out 
router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        secure:true,
        expires: new Date(0),
        sameSite: "none",
      })
      .send();
  });

router.get("/loggedin", (req, res) => {
    try {
      
      const token = req.cookies.token;
      console.log(token);
      if (!token) {  
      return res.json(false);
      }
      console.log(token);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.send(err);
    }
  });

module.exports = router;