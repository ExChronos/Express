const {Schema, model} = require('mongoose')

const adScheme = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    shortText: {
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: false
    },
    images: {
        type: Schema.Types.Array,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true
    },
    updatedAt: {
        type: Schema.Types.Date,
        required: true
    },
    tags: {
        type: Schema.Types.Array
    },
    idDeleted: {
        type: Boolean,
        required: true
    }
})

module.exports = model('advertisment', adScheme)