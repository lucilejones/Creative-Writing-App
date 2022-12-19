import React, { useContext, useEffect } from 'react'
import EntryForm from './EntryForm.js'
import EntryList from './EntryList.js'
import PromptForm from './PromptForm.js'
import { UserContext } from '../context/UserProvider.js'
import { EntryContext } from '../context/EntryProvider'

export default function Welcome() {
    const {
        user: {
            username
        }
    } = useContext(UserContext)

    const { entries, getUserEntries, addEntry, addPostedPrompt } = useContext(EntryContext)

    // useEffect(() => {
    //     getUserEntries()
    // }, [])

    return (
        <>
            <div>
                {/* <h1>Welcome {username}!</h1> */}
                <PromptForm addPostedPrompt={addPostedPrompt}/>
                <EntryForm addEntry={addEntry}/>
            </div>
            {/* <EntryList entries={entries} /> */}
        </>
    )
}