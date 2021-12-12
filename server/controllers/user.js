const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/user")

const SECRETKEY = process.env.SECRETKEY || "supsersecretKey";

const login = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const loggedinUser = await User.findOne({email})

        if(!loggedinUser)
            return res.status(404).json({message: `No user found with this email:${email}`});

        const validPassword = await bcrypt.compare(password, loggedinUser.password);
        if(!validPassword)
           return res.status(401).json({message: 'Invalid password'});
        
        const token = generateAccessToken(loggedinUser);
          
        res.status(200).json({result: loggedinUser, token})
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = User.findOne({username, email})

        if(existingUser)
            return res.status(400).json({message: `user already exists`});
        
        const hashedPassword = await bcrypt(password, 10)
        const createdUser = await User.create({username, email, hashedPassword})
        
        const token = generateAccessToken(createdUser);

        res.status(201).json({result: createdUser, token});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, SECRETKEY, {expiresIn: "1h"} )
}

module.exports= {
  login,
  signup
}