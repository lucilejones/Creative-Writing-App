const express = require('express')
const savedPromptRouter = express.Router()
const SavedPrompt = require('../models/savedPrompt.js')

// get all saved prompts
// savedPromptRouter.get("/", (req, res, next) => {
//     SavedPrompt.find()
//         .populate("postedBy", "username")
//         .exec((err, prompts) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(prompts)
//         })
// })

// get all of a user's saved prompts
savedPromptRouter.get("/user", (req, res, next) => {
    SavedPrompt.find({ savedBy: req.auth._id })
        .populate("postedBy", "username")
        .populate("savedBy", "username")
        .exec((err, prompts) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(prompts)
        })
})

// save a new prompt
savedPromptRouter.post("/", (req, res, next) => {
    req.body.savedBy = req.auth._id
    const newSavedPrompt = new SavedPrompt(req.body)
    newSavedPrompt.save((err, savedSavedPrompt) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedSavedPrompt)
    })
})

// delete a saved prompt
savedPromptRouter.delete("/:savedPromptId", (req, res, next) => {
    SavedPrompt.findOneAndDelete(
        { _id: req.params.savedPromptId, savedBy: req.auth._id },
        (err, deletedSavedPrompt) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted prompt.")
        }
    )
})

// update a saved prompt
savedPromptRouter.put("/:savedPromptId", (req, res, next) => {
    SavedPrompt.findOneAndUpdate(
        { _id: req.params.savedPromptId, savedBy: req.auth._id },
        req.body,
        { new: true },
        (err, updatedSavedPrompt) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedSavedPrompt)
        }
    )
})

module.exports = savedPromptRouter