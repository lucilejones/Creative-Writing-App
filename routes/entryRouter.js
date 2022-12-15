const express = require('express')
const entryRouter = express.Router()
const Entry = require('../models/entry.js')
// const Comment = require()

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
    Entry.deleteOne({ _id: req.params.entryId, user: req.auth._id},
        // would user need to be postedBy?
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
            return res.status(200).send(`Successfully deleted Entry ${deletedEntry.title}`)
        })
})

// update entry (edit and update)
entryRouter.put("/:entryId", (req, res, next) => {
    Entry.findOneAndUpdate(
        { _id: req.params.entryId, user: req.auth._id },
        // would user need to be postedBy?
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

// add a route to change isPublished to true



module.exports = entryRouter