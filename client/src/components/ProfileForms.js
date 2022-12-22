import React, { useContext } from 'react'
import EntryForm from './EntryForm.js'
import PromptForm from './PromptForm.js'
import { EntryContext } from '../context/EntryProvider'

export default function Welcome() {
 
    const { addEntry, addPostedPrompt } = useContext(EntryContext)


    return (
        <>
            <div className="profile-form-container">
                <h3>Add a new prompt</h3>
                <PromptForm addPostedPrompt={addPostedPrompt}/>
                <h3>Add a new entry</h3>
                <EntryForm addEntry={addEntry}/>
            </div>
        </>
    )
}