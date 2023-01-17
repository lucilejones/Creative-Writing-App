import React, { useState, useContext, useEffect } from 'react'
import { EntryContext } from '../context/EntryProvider'
import { UserContext } from '../context/UserProvider'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function ExpandedEntry() {

    const [editMode, setEditMode] = useState(false)
    const {
        oneEntry,
        togglePublishEntry,
        updateEntry,
        getEntryDetails,
        deleteEntry,
        userAxios } = useContext(EntryContext)

    const [updatedEntry, setUpdatedEntry] = useState(oneEntry)

    const [commentToggle, setCommentToggle] = useState(false)
    const [comments, setComments] = useState([])

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    useEffect(() => {
        localStorage.setItem("oneEntry", JSON.stringify(oneEntry))
    }, [])

    useEffect(() => {
        const oneEntry = JSON.parse(localStorage.getItem('oneEntry'));
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

    function commentButton(entryId) {
        getCommentsByEntry(entryId)
        setCommentToggle(prevState => !prevState)
    }

    function getCommentsByEntry(entryId) {
        userAxios.get(`/api/comment/${entryId}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err.respons.data.errMsg))
    }

    function addComment(entryId, newComment) {
 
        userAxios.post(`/api/comment/${entryId}`, newComment)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        getCommentsByEntry(entryId)
    }

    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => console.log(res))
            .then(res => setComments(prevComments => prevComments.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err.response.data.errMsg))
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
                        <button onClick={() => commentButton(oneEntry._id)}>{commentToggle ? "Hide Comments" : "Show Comments"}</button>
                    </div>
                    {commentToggle && <CommentForm
                        addComment={addComment}
                        _id={oneEntry._id}
                    />}
                    {commentToggle && <CommentList comments={comments} deleteComment={deleteComment} />}
                </div>
            }
        </>
    )
}
