const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
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
    }
})

module.exports = model("Book", BookSchema)