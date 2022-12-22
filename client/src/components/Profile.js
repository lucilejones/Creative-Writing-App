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
            <div className="profile-container">
                <h1 className="welcome">Welcome {username}!</h1>
                <ul>
                    <li>Options &#x2193;
                        <ul className="dropdown">
                            <li><Link className="link" to="/profile/profile-forms">Add new prompts and entries</Link></li>
                            <li><Link className="link" to="/profile">My saved entries</Link></li>
                            <li><Link className="link" to="/profile/saved-prompts">My saved prompts</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* <div>
                <EntryForm addEntry={addEntry}/>
            </div> */}
            {/* <EntryList entries={entries} /> */}
            <Outlet />
        </>
    )
}