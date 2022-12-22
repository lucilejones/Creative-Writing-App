import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import EntryList from './EntryList.js'
import { EntryContext } from '../context/EntryProvider'

export default function Public() {
    // const {
    //     entries,
    //     getPublishedEntries
    // } = useContext(EntryContext)

    // useEffect(() => {
    //     getPublishedEntries()
    // }, [])

    return (
        <>
            <div className="public-container">
                <h1 className="dummy-space"> </h1>
                <ul>
                    <li>Options &#x2193;
                        <ul className="dropdown">
                            <li><Link className="link" to="/public/posted-prompts">View posted prompts</Link></li>
                            <li><Link className="link" to="/public">View all published entries</Link></li>
                        </ul>
                    </li>
                </ul>

                {/* <h3>All published entries</h3> */}
                {/* <EntryList entries={entries} /> */}
                
            </div>
            <Outlet />
        </>

    )
}

{/* <div className="profile-container">
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
            </div> */}