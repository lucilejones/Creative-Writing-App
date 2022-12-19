import React, { useState, useContext } from 'react'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'


export default function SavedPrompt(props) {
    const { text, postedBy, savedBy, _id } = props
    // console.log(postedBy.username)

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    


    return (
        <div>
            <h3>{text}</h3>
            {postedBy.username !== username && <p>posted by: {postedBy.username}</p>}
        </div>
    )
}