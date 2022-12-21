import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EntryContext } from '../context/EntryProvider'
import { UserContext } from '../context/UserProvider'

export default function () {
    // const params = useParams()
    // console.log(params.entryId)
    const [editMode, setEditMode] = useState(false)
    const { oneEntry, setOneEntry, expandedId, togglePublishEntry, updateEntry, getEntryDetails, deleteEntry } = useContext(EntryContext)
    // const { title, textBody, summary, postedBy, isPublished, _id } = props
    console.log(oneEntry, "does this recognize oneEntry")
    const [updatedEntry, setUpdatedEntry] = useState(oneEntry)
    

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    useEffect(() => {
        return () => {
            localStorage.setItem("oneEntry", JSON.stringify(oneEntry))
        }
    }, [expandedId])

    useEffect(() => {
        // setOneEntry(JSON.parse(localStorage.getItem("oneEntry")))
        // console.log(oneEntry._id)
        getEntryDetails(oneEntry._id)
    }, [])

    function handlePublish() {
        togglePublishEntry(oneEntry._id)
    }

    function handleEntryChange(e) {
        const { name, value } = e.target
        setUpdatedEntry(prevUpdatedEntry => ({
            ...prevUpdatedEntry,
            [name]: value
        }))
    }

    function handleEditMode() {
        setEditMode(prevEditMode => !prevEditMode)
    }

    function save() {
        updateEntry(oneEntry._id, updatedEntry)
        setEditMode(prevEditMode => !prevEditMode)
        getEntryDetails(oneEntry._id)
    }

    return (
        <>
            {editMode ?
                <div>
                    <input
                        type="text"
                        placeholder={oneEntry.title}
                        onChange={handleEntryChange}
                        name="title"
                        value={updatedEntry.title}
                    />
                    <input
                        type="text"
                        placeholder={oneEntry.summary}
                        onChange={handleEntryChange}
                        name="summary"
                        value={updatedEntry.summary}
                    />
                    <textarea
                        placeholder={oneEntry.textBody}
                        onChange={handleEntryChange}
                        name="textBody"
                        value={updatedEntry.textBody}
                    />
                    <button onClick={save}>Save</button>
                </div>
                :
                <div>
                    <h1>{oneEntry.title}</h1>
                    <p>{oneEntry.summary}</p>
                    <p>{oneEntry.textBody}</p>
                    <p>posted by: {oneEntry.postedBy.username === username ? "you" : oneEntry.postedBy.username}</p>
                    {oneEntry.postedBy?.username === username && <button onClick={() => handlePublish(oneEntry._id)}>{oneEntry.isPublished ? "Unpublish" : "Publish"}</button>}
                    {oneEntry.postedBy?.username === username && <button onClick={handleEditMode}>Edit</button>}
                    {oneEntry.postedBy?.username === username && <button onClick={() => deleteEntry(oneEntry._id)}>Delete</button>}
                </div>
            }


        </>

    )
}
