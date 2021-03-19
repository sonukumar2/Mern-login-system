const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express();

router.post('/', async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;
        console.log(email); 

        if (!email || !password || !cpassword) {
            res.status(400).json({ msg: "Enter Details " });
        }

        if (password !== cpassword) {
            res.status(400).json({ msg: "Password MisMatch" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ msg: "Email Already Exist" });
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
        res.send(savedUser).json({"msg": "Successfuly Posted"});
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
            secure: true,
            sameSite: "none",
        }).send();

    } catch (error) {
        res.status(500).json({ msg: "hg diya" });
    }
})

// Log in

router.post('/login',  (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ "msg": "Please Enter Required fields" })
        }
        const existingUser =  User.findOne({ email });
        if (!existingUser) {
            res.status(400).json({ "msg": "Not Registered" })
        }

        const pwd =  bcrypt.compare(password, existingUser.passwordHash);
        if (!pwd) {
            res.status(401).json({ "msg": "Wrong Email and Password" })
        }
        // sign the token

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        // send the token in a HTTP-only cookie

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .send();

    } catch (error) {
        res.status(500).send(error);
    }


})


// Log Out 
router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  });

module.exports = router;