const mongoose = require('mongoose')

const documentModelSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    }
})
documentModelSchema.index({filename: 'text', content: 'text'});

const DocumentModel = mongoose.model('DocumentModel', documentModelSchema)

module.exports = DocumentModel