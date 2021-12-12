const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    mailingAddress: String,
    phoneNumber: {
        home: String,
        work: String,
        other: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;