import React, { useContext } from 'react'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'

export default function SavedPrompt(props) {
    const { text, postedBy, _id } = props

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { deleteSavedPrompt } = useContext(EntryContext)

    


    return (
        <div className="prompt">
            <h5>{text}</h5>
            <p>posted by: {postedBy.username === username ? "you" : postedBy.username}</p>
            <button onClick={() => deleteSavedPrompt(_id)}>Delete</button>
        </div>
    )
}