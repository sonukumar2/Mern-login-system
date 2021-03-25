const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const usr = require('./models/userSchema'); 

require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to MongoDB");
})

mongoose.connection.on('error',()=>{
    console.log(`Error ->`);
})

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
));
// app.use(cookieParser);

// const  startserver = () => {
//     console.log(`Server started through function`);
// }


app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
});

app.get('/', (req,res) =>{
    usr.find()
    .exec()
    .then(result=>{
        res.status(200).send(result);
    })
    .catch(err =>{
        console.log(err);
    })
})

// set up routes
app.use('/auth', require('./Router/userRouter'));
app.use('/customer', require('./Router/customerRouter'));