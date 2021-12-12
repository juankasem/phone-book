const mongoose = require('mongoose')
const Contact = require("../models/contact")

const getContacts = async (req, res) => {
    const {page} = req.query

    try {
        const docsPerPage = 10;
        const startIndex = (Number(page) - 1) * numOfDocs; // get the starting index of every page

        const totalDocs = await PostMessage.countDocuments({});
        const contacts = await Contact.find().sort({ _id: -1}).limit(docsPerPage).skip(startIndex);

        res.status(200).json({data: contacts, currentPage: Number(page), NumOfPages: Math.ceil(totalDocs/docsPerPage)});
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getContactById = async (req, res) => {
    try {
        const {id} = req.params.id;
        
    if (!mongoose.Types.ObjectId.isValid(id))    
         return res.status(400).send(`id: ${id} not valid`);
       
        const contact = await Contact.findById(id)
        
        if(contact)
        res.status(200).json(contact)
        else
        res.status(404).json({message: `contact of id: ${id} not found`})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createContact = async (req, res) => {
    const {name, email, mailingAddress, phoneNumber} = req.body;

    try {
        const createdContact = await Contact.create({_id: new mongoose.Types.ObjectId(),
                                                     name,
                                                     email,
                                                     mailingAddress, 
                                                     phoneNumber})

        res.status(201).json({result: createdContact});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  }
  
const updateContact = async (req, res) => {
    const {id} = req.params
    const {name, email, mailingAddress, phoneNumber, createdAt} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id))    
     return res.status(400).send(`id: ${id} not valid`);

     const updatedContact = {name, email, mailingAddress, phoneNumber, createdAt, _id: id};

     try {
         await Contact.findByIdAndUpdate(id, updateContact, {new: true});
         res.status(200).json(updatedContact)

     } catch (error) {
        res.status(500).json({message: error.message})
     }
}
  
const deleteContact = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id))    
      return res.status(400).send(`id: ${id} not valid`);

     try {
         await Contact.findByIdAndRemove(id)
         res.status(200).send();

     } catch (error) {
        res.status(500).json({message: error.message});
     }  }
  
module.exports= {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}