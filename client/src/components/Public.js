import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import EntryList from './EntryList.js'
import { EntryContext } from '../context/EntryProvider'

export default function Public(){
    // const {
    //     entries,
    //     getPublishedEntries
    // } = useContext(EntryContext)

    // useEffect(() => {
    //     getPublishedEntries()
    // }, [])

    return (
        <div>
            <Link to="/public/posted-prompts">View posted prompts</Link>
            <Link to="/public">View all published entries</Link>
            {/* <h3>All published entries</h3> */}
            {/* <EntryList entries={entries} /> */}
            <Outlet />
        </div>
    )
}