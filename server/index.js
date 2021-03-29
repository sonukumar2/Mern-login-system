const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const usr = require('./models/userSchema'); 

const app = express();

mongoose.Promise = global.Promise;

// --------------- Mongo DB Connection ---------------- //
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

// --------------- MiddleWare ---------------- //
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
));
app.use(cookieParser());

// const  startserver = () => {
//     console.log(`Server started through function`);
// }

// --------------- Create Server ---------------- //
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

// ------------- set up routes ------------- //
app.use('/auth', require('./Router/userRouter'));
app.use('/customer', require('./Router/customerRouter'));