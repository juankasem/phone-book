const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/user")

const login = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const loggedinUser = await User.findOne({email})

        if(!loggedinUser)
        return res.status(404).json({message: `No user found with this email:${email}`});

        const isValidPassword = 
    } 
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const newUser = new Contact({username, email, password})

    try {
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

  
module.exports= {
  
}