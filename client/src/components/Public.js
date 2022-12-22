import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Public() {

    return (
        <div className="main-container">
            <div className="public-container">
            <h1 className="welcome">The Public Community Page</h1>
                <ul>
                    <li>Actions &#x2193;
                        <ul className="dropdown">
                            <li><Link className="link" to="/public/posted-prompts">View posted prompts</Link></li>
                            <li><Link className="link" to="/public">View all published entries</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <Outlet />
        </div>

    )
}
