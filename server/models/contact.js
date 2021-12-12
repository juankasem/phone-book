const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    mailingAddress: SVGAnimatedTransformList,
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

const contact = mongoose.model('Contact', contactSchema)

module.exports = contact;