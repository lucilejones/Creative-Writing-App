import React, { useState, useContext } from 'react'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'
// import CommentForm
// import CommentList



export default function Entry(props) {
    const [togglePublish, setTogglePublish] = useState(false)
    const { title, textBody, postedBy, isPublished, _id } = props
    // console.log(postedBy.username)

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { togglePublishEntry } = useContext(EntryContext)

    function handlePublish(_id){
        togglePublishEntry(_id)
    }


    return (
        <div>
            <h1>{title}</h1>
            <h3>{textBody}</h3>
            {postedBy.username !== username && <p>posted by: {postedBy.username}</p>}
            {postedBy.username === username && <button onClick={() => handlePublish(_id)}>{isPublished ? "Unpublish" : "Publish"}</button>}
        </div>
    )
}