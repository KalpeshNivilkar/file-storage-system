import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-hot-toast'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with API
      fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user)
          } else {
            localStorage.removeItem('token')
          }
          setLoading(false)
        }).catch(() => {
          localStorage.removeItem('token')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login login={login} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App

