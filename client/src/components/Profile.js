import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserProvider.js'


export default function Profile() {
    const {
        user: {
            username
        }
    } = useContext(UserContext)


    return (
        <div className="main-container">
            <div className="profile-container">
                <h1 className="welcome">Welcome {username}!</h1>
                    <ul>
                        <li>Actions &#x2193;
                            <ul className="dropdown">
                                <li><Link className="link" to="/profile/profile-forms">Add new prompts and entries</Link></li>
                                <li><Link className="link" to="/profile">My saved entries</Link></li>
                                <li><Link className="link" to="/profile/saved-prompts">My saved prompts</Link></li>
                            </ul>
                        </li>
                    </ul>
            </div>

            <Outlet />
        </div>
    )
}