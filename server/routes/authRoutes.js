const express=  require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

const router = express.Router();

router.post("/signup",async(req,res)=>{
    try{
        // when frontend or postman sends json like data express store that data in req.body
        // const name = req.body.name;
        // const email = req.body.email
        // const password = req.body.password
        // const role = req.body.role
// destructuring 
        const{name,email,password,role} = req.body

        // now we got the data the next step is validation
        // validation1: check everything is filled or not

        if(!name || !email || !password){
            return res.status (400).json({message:"Name,email, and password are required,"})
        }
        //now check if the user is already exist or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists",})
        }

        //next step is to hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        // create and saave the new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role:role || "member",

        })
        // now save the user in mongodb
        const savedUser = await newUser.save();
        // now generate the jwt token: total three things: 1.payload details, 2. jwt secret 3. expirein
        const token = jwt.sign(
            {
                userId:savedUser._id,
                role:savedUser.role,
            },
            process.env.JWt_SECRET,
            {
                expiresIn:process.env.JWt_EXPIRES_IN,
            }
        );
        // send the success response
        res.status(201).json({
            message:"User created successfully",
            token,
            user:{
                id:savedUser._id,
                name:savedUser.name,
                email:savedUser.email,
                role:savedUser,role,
    
            }
        })
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router