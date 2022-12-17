import React, { useState } from 'react'

const initIputs = {
    title: "",
    textBody: ""
}

export default function EntryForm(props) {
    const [inputs, setInputs] = useState(initIputs)
    const { addEntry } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addEntry(inputs)
        setInputs(initIputs)
    }

    const { title, textBody } = inputs

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="title"
            />
            <textarea 
                name="textBody"
                value={textBody}
                onChange={handleChange}
                placeholder="Start writing..."
            />
            <button>Add new entry</button>
        </form>
    )
}