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

    function deleteEntry() {

    }

    // function updateEntry() {

    // }

    return (
        <EntryContext.Provider
            value={{
                entries,
                getUserEntries,
                getPublishedEntries,
                addEntry,
                togglePublishEntry,
                deleteEntry
            }}
        >
            {props.children}
        </EntryContext.Provider>
    )
}