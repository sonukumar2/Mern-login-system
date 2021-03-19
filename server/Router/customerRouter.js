const express = require('express');
const Customer = require('../models/customerSchema');
const auth = require('../middleware/auth');

const router = express();

router.post("/", auth, async(req, res)=>{
    try {
        const {name} = req.body;
        const newCustomer = new Customer({
            name
        });
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
        
    } catch (error) {
        res.status(400).json(error); 
    }
})

module.exports = router;