import React from 'react'
import Prompt from './Prompt.js'

export default function PostedPromptList(props) {
    const { postedPrompts } = props

    const sortedList = [].concat(postedPrompts)
        .sort((a,b) => b.timestamp > a.timestamp ? 1 : -1)
        .map((prompt) => 
            <Prompt key={prompt._id} {...prompt}/>
        )

    return (
        <div>
            { sortedList }
        </div>
    )
  
}