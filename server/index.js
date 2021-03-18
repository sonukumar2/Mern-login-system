const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res)=>{
    res.end("Heeee");
    
})

app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
})