const Contact = require("../models/contact")

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts)
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

    const newContact = new Contact({name, email, mailingAddress, phoneNumber})

    try {
        await newContact.save();
        res.status(201).json(newContact);
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
  
const deleteContact = (req, res) => {
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