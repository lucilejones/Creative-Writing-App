import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserProvider'

const initInputs = { username: "", password: "" }

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div>
            <h1 className="main-title">People and Punctuation</h1>
            <h3 className="main-sub-title">Join our Creative Writing Community</h3>
            <div className="auth-page-container">
                <p className='site-info'>Practice your writing skills with community-submitted prompts and get feedback from fellow writers.</p>

                <div className="login-form-container">
                    {toggle ?
                        <>
                            <AuthForm
                                handleChange={handleChange}
                                handleSubmit={handleSignup}
                                inputs={inputs}
                                btnText="Sign up"
                                errMsg={errMsg}
                            />
                            <p className="small-text" onClick={toggleForm}>Already a member?</p>
                        </>
                        :
                        <>
                            <AuthForm
                                handleChange={handleChange}
                                handleSubmit={handleLogin}
                                inputs={inputs}
                                btnText="Login"
                                errMsg={errMsg}
                            />
                            <p className="small-text" onClick={toggleForm}>Not a member?</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}