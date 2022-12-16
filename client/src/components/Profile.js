import React, { useContext, useEffect } from 'react'
// import EntryForm from './EntryForm.js'
import EntryList from './EntryList.js'
import { UserContext } from '../context/UserProvider.js'
import { EntryContext } from '../context/EntryProvider'

export default function Profile() {
    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { entries, getUserEntries } = useContext(EntryContext)

    useEffect(() => {
        getUserEntries()
    }, [])

    return (
        <>
            <div>
                <h1>Welcome {username}!</h1>
            </div>
            <EntryList entries={entries} />
        </>
    )
}