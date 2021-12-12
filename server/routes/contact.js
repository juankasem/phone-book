const express = require('express')
const { getContacts } = require('../controllers/contact.js')

const router = express.Router();

router.get('/', getContacts)



module.exports = router