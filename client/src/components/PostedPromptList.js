import React from 'react'
import PostedPrompt from './PostedPrompt.js'

export default function PostedPromptList(props) {
    const { postedPrompts } = props

    const sortedList = [].concat(postedPrompts)
        .sort((a, b) => b.timestamp > a.timestamp ? 1 : -1)
        .map((prompt) =>
            <PostedPrompt key={prompt._id} {...prompt} />
        )

    return (
        <div>
            {sortedList}
        </div>
    )

}