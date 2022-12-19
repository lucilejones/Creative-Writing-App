const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savedPromptSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    savedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("SavedPrompt", savedPromptSchema)