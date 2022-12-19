import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import EntryForm from './EntryForm.js'
import EntryList from './EntryList.js'
import { UserContext } from '../context/UserProvider.js'
import { EntryContext } from '../context/EntryProvider'

export default function Profile() {
    const {
        user: {
            username
        }
    } = useContext(UserContext)



    // const { entries, getUserEntries, addEntry } = useContext(EntryContext)

    // useEffect(() => {
    //     getUserEntries()
    // }, [])

    return (
        <>
            <h1>Welcome {username}!</h1>
            <Link to="/profile/profile-forms">Add new prompts and entries</Link>
            <Link to="/profile">My saved entries</Link>
            <Link to="/profile/saved-prompts">My saved prompts</Link>
            {/* <div>
                <EntryForm addEntry={addEntry}/>
            </div> */}
            {/* <EntryList entries={entries} /> */}
            <Outlet />
        </>
    )
}