const express = require('express')
const entryRouter = express.Router()
const Entry = require('../models/entry.js')
const Comment = require('../models/comment.js')

// get all entries
entryRouter.get("/", (req, res, next) => {
    Entry.find()
    .populate("postedBy", "username")
    .exec((err, entries) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(entries)
    })
})

// get entries by user id
entryRouter.get("/user", (req, res, next) => {
    Entry.find({ postedBy: req.auth._id }, (err, entries) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(entries)
    })
})

// get all published entries
entryRouter.get("/publish", (req, res, next) => {
    Entry.find({ isPublished: true }, (err, entries) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(entries)
    })
})

// add new entry
entryRouter.post("/", (req, res, next) => {
    req.body.postedBy = req.auth._id
    const newEntry = new Entry(req.body)
    newEntry.save((err, savedEntry) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedEntry)
    })
})

// delete entry (plus all the comments attached to it)
entryRouter.delete("/:entryId", (req, res, next) => {
    Entry.deleteOne({ _id: req.params.entryId, postedBy: req.auth._id},
        // user or postedBy?
        (err, deletedEntry) => {
            if(err){
                res.status(500)
                return next(err)
            }
            Comment.deleteMany({entry: req.params.entryId},
                (err, deletedEntry) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                })
            return res.status(200).send(`Successfully deleted Entry.`)
        })
})

// update entry (edit and update)
entryRouter.put("/:entryId", (req, res, next) => {
    Entry.findOneAndUpdate(
        { _id: req.params.entryId, postedBy: req.auth._id },
        // user or postedBy?
        req.body,
        { new: true },
        (err, updatedEntry) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedEntry)
        }
    )
})

// toggle isPublished between true/false
entryRouter.put("/publish/:entryId", (req, res, next) => {
    Entry.findById({ _id: req.params.entryId}, (err, entry) => {
        entry.isPublished = !entry.isPublished
        entry.save( (err, updatedEntry) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedEntry)
        })
    })
})
// have a button that toggles a "/published" route and also toggles the btn text
// from publish to unpublish



module.exports = entryRouter