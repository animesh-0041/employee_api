const express=require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require('./route/user.route');
const { emplyeRoute } = require('./route/employee.route');

require('dotenv').config();
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api',userRoute)
app.use('/employee',emplyeRoute)



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log('conected to mongoDB'); 
    } catch (error) {
        console.log(error);
    }
    console.log(`http://localhost:${process.env.PORT}`);
})