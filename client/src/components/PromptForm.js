import React, { useState } from 'react'

export default function PromptForm(props){
    const [input, setInput] = useState("")
    const { addPostedPrompt } = props

    function handleChange(e){
        const {name, value} = e.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addPostedPrompt(input)
        setInput("")
    }

    const {text} = input

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="submit a new prompt"
            />
            <buton>Add Prompt</buton>
        </form>
    )
}