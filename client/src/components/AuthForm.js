import React from 'react'

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <input
                className=''
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="username"
            />
            <br />
            <input
                className=''
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="password"
            />
            <br />
            <button className=''>{btnText}</button>
            <p style={{ color: "red" }}>{errMsg}</p>
        </form>
    )
}