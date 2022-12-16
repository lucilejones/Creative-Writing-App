import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
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

    function getUserEntries() {
        userAxios.get("/api/entry/user")
            .then(res => setEntries(prevEntries => [...prevEntries, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    // .then(res => setEntries(prevEntries => [...prevEntries, res.data]))

    function getPublishedEntries() {

    }

    function addEntry() {

    }

    function publishEntry() {

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
                publishEntry,
                deleteEntry
            }}
        >
            {props.children}
        </EntryContext.Provider>
    )
}