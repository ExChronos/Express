const {Schema, model} = require('mongoose')

const userScheme = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        default: 'examle@gmail.com',
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: '12345'
    },
    name: {
        type: String,
        required: true,
        default: 'John'
    },
    contactPhone: {
        type: String,
        required: false,
        default: '1-111-111-11-11'
    }
})

module.exports = model("userinfo", userScheme)