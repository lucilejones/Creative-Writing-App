import React, { useState, useContext } from 'react'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'
// import CommentForm
// import CommentList



export default function Entry(props) {
    // const initIputs = {...props}
    const [togglePublish, setTogglePublish] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { title, textBody, postedBy, isPublished, _id } = props
    const [updatedEntry, setUpdatedEntry] = useState({...props})

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { togglePublishEntry, updateEntry } = useContext(EntryContext)

    function handlePublish(_id) {
        togglePublishEntry(_id)
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
        updateEntry(_id, updatedEntry)
        setEditMode(prevEditMode => !prevEditMode)
    }


    return (
        <>
            {editMode ?
                <div>
                    <input 
                        type="text"
                        placeholder={title}
                        onChange={handleEntryChange}
                        name="title"
                        value={updatedEntry.title}
                    />
                    <textarea
                        placeholder={textBody}
                        onChange={handleEntryChange}
                        name="textBody"
                        value={updatedEntry.textBody}
                    />
                    <button onClick={save}>Save</button>
                </div> :
                <div>
                    <h1>{title}</h1>
                    <h3>{textBody}</h3>
                    {postedBy.username !== username && <p>posted by: {postedBy.username}</p>}
                    {postedBy.username === username && <button onClick={() => handlePublish(_id)}>{isPublished ? "Unpublish" : "Publish"}</button>}
                    <button onClick={handleEditMode}>Edit</button>
                </div>
            }
        </>

    )
}