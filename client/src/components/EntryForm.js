import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initIputs = {
    title: "",
    summary: "",
    textBody: ""
}

export default function EntryForm(props) {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState(initIputs)
    const { addEntry } = props

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        addEntry(inputs)
        setInputs(initIputs)
        navigate("/profile")
    }

    const { title, summary, textBody } = inputs

    return (
        <form onSubmit={handleSubmit} className="entry-form">
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="title"
            />
            <input
                type="text"
                name="summary"
                value={summary}
                onChange={handleChange}
                placeholder="summary"
            />
            <textarea
                name="textBody"
                value={textBody}
                onChange={handleChange}
                placeholder="Start writing..."
            />
            <div>
                <button>Add new entry</button>
            </div>
        </form>
    )
}