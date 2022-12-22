import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    const { logout } = props

    return (
        <nav className="navbar">
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/public">Public</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}