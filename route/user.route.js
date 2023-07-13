const express=require("express")
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const userRoute=express.Router()




// register
userRoute.post("/register",async(req,res)=>{
    const {email,password}=req.body
    try {
        bcrypt.hash(password, 5, (err, hash) =>{
            const user= new UserModel({email,password:hash})
            user.save();
            res.send("Registration successfull")
        });
    } catch (error) {
        res.send(error)
    }
})


//login
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
  
        const user= await UserModel.findOne({email})
        if(user){
            try {
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({userID:user._id}, 'employees');
                        res.send({"msg":"login successful","token":token})
                    }
                    else{
                        res.send({"msg":"Invalid Credentials"})
                    }
                });
                
            } catch (error) {
                res.send(error)
            }
           
        }
        else{
            res.send({"msg":"User not found!"})
        }
   
})





module.exports={
    userRoute
}