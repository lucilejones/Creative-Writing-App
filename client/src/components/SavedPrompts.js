import React, { useContext, useEffect } from 'react'
import SavedPromptList from './SavedPromptList.js'
import { EntryContext } from '../context/EntryProvider'

export default function SavedPrompts(){
    
    const {
        savedPrompts,
        getUserSavedPrompts
    } = useContext(EntryContext)


    useEffect(() => {
        getUserSavedPrompts()
    }, [])

    return (
        <div className="prompts-container">
            <h3 className='prompt-heading'>Your saved prompts</h3>
            <SavedPromptList savedPrompts={savedPrompts} />
        </div>
    )
}