import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'

export default function Comment(props) {
    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { text, commentedBy, deleteComment, _id } = props
    // console.log(commentedBy.username)


    return (
        <div className='comment-container'>
            <div className='comment-text'>
                <span>{commentedBy.username}:</span>
                <p>{text}</p>
            </div>
            {username === commentedBy.username && <button onClick={() => deleteComment(_id)} className="btn btn-secondary btn-sm">Delete</button>}
        </div>
    )
}