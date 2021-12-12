const express = require('express')
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contact.js')

const router = express.Router();

router.get('/', getContacts)
router.get('/:id', getContactById)
router.post('/', createContact)
router.post('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router