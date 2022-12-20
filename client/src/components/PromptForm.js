import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initIput = {
    text: ""
}

export default function PromptForm(props){
    const navigate = useNavigate()
    const [input, setInput] = useState(initIput)
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
        navigate("/public/posted-prompts")
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
            <button>Add Prompt</button>
        </form>
    )
}