import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/UserProvider.js'
import axios from 'axios'


export const EntryContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function EntryProvider(props) {
    const [entries, setEntries] = useState([])
    const [postedPrompts, setPostedPrompts] = useState([])
    const [savedPrompts, setSavedPrompts] = useState([])
    const [oneEntry, setOneEntry] = useState({})

    // const {
    //     user: {
    //         username
    //     } } = useContext(UserContext)

    // function getAllEntries() {

    // }

    const navigate = useNavigate()

    function getUserEntries() {
        userAxios.get("/api/entry/user")
            .then(res => {
                setEntries(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getPublishedEntries() {
        userAxios.get("/api/entry/publish")
            .then(res => {
                setEntries(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addEntry(newEntry) {
        userAxios.post("/api/entry", newEntry)
            .then(res => {
                setEntries(prevEntries => [...prevEntries, res.data])
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function togglePublishEntry(entryId) {
        userAxios.put(`/api/entry/publish/${entryId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        getPublishedEntries()
    }

    function deleteEntry(entryId) {
        userAxios.delete(`/api/entry/${entryId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        navigate("/profile")
    }

    function getEntryDetails(entryId) {
        userAxios.get(`/api/entry/expanded-entry/${entryId}`)
            .then(res => console.log(res.data))
            // .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }
    // change to res => setOneEntry(res.data)

    // function updateEntry(entryId, update) {
    //     userAxios.put(`/api/entry/${entryId}`, update)
    //      .then(setEntries(prevEntries => prevEntries.map(entry => entry._id === entryId ?
    //         {...entry, title: update.title, textBody: update.textBody} : entry)))
    // }

    function updateEntry(entryId, update) {
        userAxios.put(`/api/entry/${entryId}`, update)
            .then(res => setOneEntry(prevOneEntry => ({...prevOneEntry, title: update.title, summary: update.summary, texBody: update.textBody})))
    }

    function addPostedPrompt(newPostedPrompt) {
        userAxios.post("/api/posted-prompt", newPostedPrompt)
            .then(res => {
                setPostedPrompts(prevPostedPropmts => [...prevPostedPropmts, res.data])
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getPostedPrompts() {
        userAxios.get("/api/posted-prompt")
            .then(res => {
                setPostedPrompts(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserSavedPrompts() {
        userAxios.get("/api/saved-prompt/user")
            .then(res => {
                setSavedPrompts(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function saveAPostedPrompt(text, postedBy, _id) {
        const savedPrompt = {
            text: text,
            postedBy: postedBy
        }
        userAxios.post("/api/saved-prompt", savedPrompt)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteSavedPrompt(savedPromptId) {
        userAxios.delete(`/api/saved-prompt/${savedPromptId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.errMsg))
        getUserSavedPrompts()
    }

    return (
        <EntryContext.Provider
            value={{
                entries,
                getUserEntries,
                getPublishedEntries,
                addEntry,
                togglePublishEntry,
                oneEntry,
                setOneEntry,
                getEntryDetails,
                updateEntry,
                deleteEntry,
                postedPrompts,
                getPostedPrompts,
                addPostedPrompt,
                saveAPostedPrompt,
                savedPrompts,
                getUserSavedPrompts,
                deleteSavedPrompt
            }}
        >
            {props.children}
        </EntryContext.Provider>
    )
}