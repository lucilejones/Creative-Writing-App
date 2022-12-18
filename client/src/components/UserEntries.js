import React, { useContext, useEffect } from 'react'
import EntryList from './EntryList.js'
import { UserContext } from '../context/UserProvider.js'
import { EntryContext } from '../context/EntryProvider'

export default function Entries(){
    // const {
    //     user: {
    //         username
    //     }
    // } = useContext(UserContext)

    const { entries, getUserEntries, addEntry } = useContext(EntryContext)

    useEffect(() => {
        getUserEntries()
    }, [])

    return (
        <>
            <div>
                <p>Your saved entries</p>
            </div>
            <EntryList entries={entries} />
        </>
    )
}