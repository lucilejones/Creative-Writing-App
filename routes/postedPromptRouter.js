const express = require('express')
const postedPromptRouter = express.Router()
const PostedPrompt = require('../models/postedPrompt.js')

// get all prompts
postedPromptRouter.get("/", (req, res, next) => {
    PostedPrompt.find()
        .populate("postedBy", "username")
        .exec((err, prompts) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(prompts)
        })
})

// get all of a user's posted prompts?


// add new prompt
postedPromptRouter.post("/", (req, res, next) => {
    req.body.postedBy = req.auth._id
    const newPostedPrompt = new PostedPrompt(req.body)
    newPostedPrompt.save((err, savedPostedPrompt) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPostedPrompt)
    })
})

// delete a posted prompt
postedPromptRouter.delete("/:postedPromptId", (req, res, next) => {
    PostedPrompt.findOneAndDelete(
        { _id: req.params.postedPromptId, user: req.auth._id },
        // would user need to be postedBy?
        (err, deletedPostedPrompt) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted prompt.")
        }
    )
})

// update a prompt
postedPromptRouter.put("/:postedPromptId", (req, res, next) => {
    PostedPrompt.findOneAndUpdate(
        { _id: req.params.postedPromptId, user: req.auth._id },
        // would user need to be postedBy?
        req.body,
        { new: true },
        (err, updatedPostedPrompt) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPostedPrompt)
        }
    )
})

module.exports = postedPromptRouter