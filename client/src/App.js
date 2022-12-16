import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth.js'
import { UserContext } from './context/UserProvider.js'



export default function App(){
  const { token, logout } = useContext(UserContext)

  return (
    <>
    <Routes>
      <Route 
        path="/"
        element={<Auth />}
      />
    </Routes>
    </>
  )
}

// // a user's private entries <ProfileEntries />
// <Route path="/profile-entries" element={} />
// // a more expanded view of one entry <EntryExpanded />
// <Route path="/profile-entries/:entryId" element={} />
// // the full list of published entries <PublicEntries />
// <Route path="/public-entries" element={} />
// // the full list of posted prompts <PublicPrompts />
// <Route path="/public-prompts" element={} />