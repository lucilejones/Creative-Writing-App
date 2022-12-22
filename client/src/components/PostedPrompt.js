import React, { useState, useContext } from 'react'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'


export default function PostedPrompt(props) {
    const { text, postedBy, _id } = props

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const {saveAPostedPrompt} = useContext(EntryContext)

    return (
        <div className="prompt">
            <h3>{text}</h3>
            <p>posted by: {postedBy.username === username ? "you" : postedBy.username}</p>
            <button onClick={() => saveAPostedPrompt(text, postedBy, _id)}>Save to my list of prompts</button>
        </div>
    )
}
