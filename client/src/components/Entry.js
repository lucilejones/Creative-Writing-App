import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'
// import CommentForm
// import CommentList

export default function Entry(props) {
    const [editMode, setEditMode] = useState(false)
    const { title, textBody, summary, postedBy, isPublished, _id } = props
    const [updatedEntry, setUpdatedEntry] = useState({...props})

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { togglePublishEntry, updateEntry, setOneEntry } = useContext(EntryContext)

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
                    <input 
                        type="text"
                        placeholder={summary}
                        onChange={handleEntryChange}
                        name="summary"
                        value={updatedEntry.summary}
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
                    {/* <h1>{title}</h1> */}
                    <Link to ={`/entry/${_id}`} onClick={() => setOneEntry(props)}>{title}</Link>
                    {summary && <p>Summary: {summary}</p>}
                    {/* <p>{textBody}</p> */}
                    <p>posted by: {postedBy.username === username ? "you" : postedBy.username}</p>
                    {/* {postedBy.username === username && <button onClick={() => handlePublish(_id)}>{isPublished ? "Unpublish" : "Publish"}</button>}
                    {postedBy.username === username && <button onClick={handleEditMode}>Edit</button>} */}
                    {/* move this edit button to the ExpandedEntry component? */}
                </div>
            }
        </>

    )
}