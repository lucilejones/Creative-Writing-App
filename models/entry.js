const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    textBody: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Entry", entrySchema)