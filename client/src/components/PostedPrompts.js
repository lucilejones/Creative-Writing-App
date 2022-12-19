import React, { useContext, useEffect } from 'react'
import PostedPromptList from './PostedPromptList.js'
import { EntryContext } from '../context/EntryProvider'

export default function PostedPrompts(){
    
    const {
        postedPrompts,
        getPostedPrompts
    } = useContext(EntryContext)

    // console.log(postedPrompts)

    useEffect(() => {
        getPostedPrompts()
    }, [])

    return (
        <div>
            <h3>All posted prompts</h3>
            <PostedPromptList postedPrompts={postedPrompts} />
        </div>
    )
}