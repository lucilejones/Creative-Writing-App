import React, { useContext, useEffect } from 'react'
import PostedPromptList from './PostedPromptList.js'
import { EntryContext } from '../context/EntryProvider'

export default function PostedPrompts(){
    
    const {
        postedPrompts,
        getPostedPrompts
    } = useContext(EntryContext)

    useEffect(() => {
        getPostedPrompts()
    }, [])

    return (
        <div className="prompts-container">
            <h3 className='prompt-heading'>All posted prompts</h3>
            <PostedPromptList postedPrompts={postedPrompts} />
        </div>
    )
}