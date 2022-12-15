const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postedPromptSchema = new Schema({
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
    }
})

module.exports = mongoose.model("PostedPrompt", postedPromptSchema)