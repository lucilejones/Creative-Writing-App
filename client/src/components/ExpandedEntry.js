import React, { useState, useContext, useEffect } from 'react'
import { EntryContext } from '../context/EntryProvider'
import { UserContext } from '../context/UserProvider'

export default function () {
    const [editMode, setEditMode] = useState(false)
    const { oneEntry, expandedId, togglePublishEntry, updateEntry, getEntryDetails, deleteEntry } = useContext(EntryContext)
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
                <div className="edit-form-container">
                    <div className="entry-form">
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
                        <div className="button-container">
                            <button onClick={save}>Save</button>
                        </div>
                    </div>
                </div>
                :
                <div className="expanded-entry-container">
                    <h1 className="expanded-title">{oneEntry.title}</h1>
                    <p>summary: {oneEntry.summary}</p>
                    <p className="expanded-text-body">{oneEntry.textBody}</p>
                    <p>posted by: {oneEntry.postedBy.username === username ? "you" : oneEntry.postedBy.username}</p>
                    <div className="button-container">
                        {oneEntry.postedBy?.username === username && <button onClick={() => handlePublish(oneEntry._id)}>{oneEntry.isPublished ? "Unpublish" : "Publish"}</button>}
                        {oneEntry.postedBy?.username === username && <button onClick={handleEditMode}>Edit</button>}
                        {oneEntry.postedBy?.username === username && <button onClick={() => deleteEntry(oneEntry._id)}>Delete</button>}
                    </div>

                </div>
            }
        </>
    )
}
