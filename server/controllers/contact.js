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
        res.status(404).json({message: error.message})
    }
}

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.status(200).json(contact)

    } catch (error) {
        res.status(404).json({message: error.message})
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
        res.status(400).json({message: error.message})
    }
  }
  
const updateContact = async (req, res) => {
    const {id} = req.params
    const {name, email, mailingAddress, phoneNumber, createdAt} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id))    
     return res.status(404).send(`No contact with id: ${id}`);

     const updatedContact = {name, email, mailingAddress, phoneNumber, createdAt, _id: id};

     try {
         await Contact.findByIdAndUpdate(id, updateContact, {new: true});
         res.status(200).json(updatedContact)

     } catch (error) {
        res.status(400).json({message: error.message})
     }
}
  
const deleteContact = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id))    
     return res.status(404).send(`No contact with id: ${id}`);

     try {
         await Contact.findByIdAndRemove(id)
         res.status(200).json();

     } catch (error) {
        res.status(400).json({message: error.message});
     }  }
  
module.exports= {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}