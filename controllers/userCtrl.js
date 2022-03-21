const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const secret = "test"

const userCtrl = {
    signin : async (req,res) => {
        const {email, password} = req.body;
        try {
            const oldUser = await User.findOne({email});
            if(!oldUser) return res.status(404).json({message : "User does not exists"})

            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
            if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Email Id or Password"});

            const token = jwt.sign({email : oldUser.email, id : oldUser._id}, secret, {expiresIn : "1h"});
            res.status(200).json({result : oldUser, token})

        } catch (error) {
            res.status(500).json({message : "Something went wrong"})
            console.log(error)
        }
    },

    signup:  async (req, res) => {
        const {email, password, firstName, lastName} = req.body
        try {
            const oldUser = await User.findOne({email})
            if(oldUser){
                return res.status(400).json({message : "User already exists"})
            }
    
            const hashedPassword = await bcrypt.hash(password,10);
            const result = await User.create({
                email, 
                password : hashedPassword,
                name : `${firstName} ${lastName}`
            })
    
            const token = jwt.sign({email : result.email, id : result._id}, secret, {expiresIn : "1h"})
            res.status(200).json({result, token})
        } catch (error) {
            res.status(500).json({message : "Something went wrong"})
            console.log(error)
        }
    },
    googleSignin : async (req,res) => {
        const {email, name, token, googleId} = req.body;
        try {
            const oldUser = await User.findOne({email});
            if(oldUser){
                const result = {_id:oldUser._id.toString(), email, name};
                return res.status(200).json({result, token})
            }
            const result = await User.create({
                email,
                name,
                googleId
            })
            res.status(200).json({result, token})
        } catch (error) {
            res.status(500).json({message : "Something went wrong"})
            console.log(error)
        }
    }
    
}


module.exports = userCtrl