import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import ProfileForms from './components/ProfileForms.js'
import UserEntries from './components/UserEntries.js'
import Public from './components/Public.js'
import PublishedEntries from './components/PublishedEntries.js'
import ExpandedEntry from './components/ExpandedEntry.js'
import PostedPrompts from './components/PostedPrompts.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import { UserContext } from './context/UserProvider.js'
import SavedPrompts from './components/SavedPrompts.js'
import Footer from './components/Footer.js'

export default function App() {
  const { token, logout } = useContext(UserContext)

  return (
    <div className="site">
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Auth />}
        />

        <Route path="/profile" element={<ProtectedRoute token={token} redirectTo="/">
          <Profile />
        </ProtectedRoute>} >
          <Route path="profile-forms" element={<ProfileForms />} />
          <Route index element={<UserEntries />} />
          <Route path="saved-prompts" element={<SavedPrompts />} />
        </Route>

        <Route
          path="/entry/:entryId"
          element={<ProtectedRoute token={token} redirectTo="/">
            <ExpandedEntry />
          </ProtectedRoute>}
        />

        <Route path="/public" element={<ProtectedRoute token={token} redirectTo="/">
          <Public />
        </ProtectedRoute>} >
          <Route path="posted-prompts" element={<PostedPrompts />} />
          <Route index element={<PublishedEntries />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  )
}
