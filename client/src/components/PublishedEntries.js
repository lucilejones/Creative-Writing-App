import React, { useContext, useEffect } from 'react'
import EntryList from './EntryList.js'
import { EntryContext } from '../context/EntryProvider'

export default function Public(){
    const {
        entries,
        getPublishedEntries
    } = useContext(EntryContext)

    useEffect(() => {
        getPublishedEntries()
    }, [])

    return (
        <div className="entries-container">
            <h3>All published entries</h3>
            <EntryList entries={entries} />
        </div>
    )
}