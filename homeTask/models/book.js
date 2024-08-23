const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ""
    },
    auth: {
        type: String,
        default: ""
    },
    fav: {
        type: String,
        default: ""
    },
    fCover: {
        type: String,
        default: ""
    },
    fName: {
        type: String,
        default: ""
    },
    id: {
        type: String,
        require: true
    },
})

module.exports = model('Book', BookSchema)