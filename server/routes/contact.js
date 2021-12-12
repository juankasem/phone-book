const express = require('express')
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contact.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/', getContacts)
router.get('/:id', getContactById)
router.post('/', auth, createContact)
router.post('/:id', auth, updateContact)
router.delete('/:id', auth, deleteContact)

module.exports = router