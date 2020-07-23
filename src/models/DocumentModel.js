const mongoose = require('mongoose')

const documentModelSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minLength: 7
    }
})

const DocumentModel = mongoose.model('Document', documentModelSchema)

module.exports = DocumentModel