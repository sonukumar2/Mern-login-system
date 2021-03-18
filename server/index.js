const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("connected to MongoDB");
})

mongoose.connection.on('error',()=>{
    console.log("Error Occured");
})

const port = process.env.PORT || 6000;


app.use(express.json());
app.use(cors())


app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
})

// set up routes
app.use('/auth', require('./Router/userRouter'));