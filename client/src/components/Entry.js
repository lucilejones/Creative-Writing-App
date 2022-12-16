import React, { useState, useContext } from 'react'
// import CommentForm
// import CommentList
import { UserContext } from '../context/UserProvider'
// import { EntryContext } from '../context/EntryProvider'

export default function Entry(props) {
    const {title, textBody, postedBy, _id } = props

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    return (
        <div>
            <h1>{title}</h1>
            <h3>{textBody}</h3>
            <p>{postedBy}</p>
        </div>
    )
}