import React, { useContext, useEffect } from 'react'
import EntryList from './EntryList.js'
import { EntryContext } from '../context/EntryProvider'

export default function Entries() {

    const { entries, getUserEntries } = useContext(EntryContext)

    useEffect(() => {
        getUserEntries()
    }, [])

    return (
        <>
            <div className="entries-container">
                <div>
                    <h3>Your saved entries</h3>
                    <EntryList entries={entries} />
                </div>
            </div>

        </>
    )
}