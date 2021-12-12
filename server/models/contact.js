const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    mailingAddress: {type: String},
    phoneNumber: {
        home: {type: String},
        work: {type: String},
        other: {type: String}
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;