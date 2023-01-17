import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { EntryContext } from '../context/EntryProvider.js'
import { UserContext } from '../context/UserProvider.js'

export default function Entry(props) {
    const { title, summary, postedBy, isPublished, _id } = props

    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { setOneEntry } = useContext(EntryContext)

    return (
        <div className="saved-entry">
            <Link to={`/entry/${_id}`} onClick={() => setOneEntry(props)} className="title-link">{title}</Link>
            {summary && <p className="summary-text">Summary: {summary}</p>}
            <div className="entry-stats-container">
                <p>posted by: {postedBy.username === username ? "you" : postedBy.username}</p>
                <p>Status: {isPublished ? "Published" : "Unpublished"}</p>
            </div>
        </div>
    )
}



