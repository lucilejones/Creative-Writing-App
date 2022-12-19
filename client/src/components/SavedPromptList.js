import React from 'react'
import SavedPrompt from './SavedPrompt.js'

export default function SavedPromptList(props) {
    const { savedPrompts } = props

    const sortedList = [].concat(savedPrompts)
        .sort((a, b) => b.timestamp > a.timestamp ? 1 : -1)
        .map((prompt) =>
            <SavedPrompt key={prompt._id} {...prompt} />
        )

    return (
        <div>
            {sortedList}
        </div>
    )

}