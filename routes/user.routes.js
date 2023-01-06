const express = require('express');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const UserModel = require('../models/User.model');
const userController = express.Router();


userController.post("/register",(req, res)=>{
       const {email,password} = req.body;
    //    console.log(email,password)
       bcrypt.hash(password,6,async function(err,hash){
        if(err){
            res.send("please try again")
        }
        const user =new UserModel({
            email,
            password:hash
        })
        await user.save();
        res.send("Sign up is successfully")
    })
})


userController.post("/login",async (req, res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    const user =await UserModel.findOne({email})
    if(!user){
        return res.send("Invalid Credentials")
    }
    const hash = user.password;
    const userId = user._id;
    bcrypt.compare(password, hash,function(err,result){
        if(result){
            var token = jwt.sign({email,userId},"secret")
            return res.send({"message":'login successful',"token":token})
        }else{
            return res.send("invalid Creadentials")
        }
    })
})

module.exports = userController;