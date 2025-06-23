// src/pages/Login.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate }              from 'react-router-dom'
import Navbar                       from '../components/Navbar.jsx'

export default function Login() {
  const [passkey, setPasskey] = useState('')
  const [users,   setUsers]   = useState(null)
  const navigate              = useNavigate()

  // 1. Load and parse users.csv manually on mount
  useEffect(() => {
    fetch('/users.csv')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.text()
      })
      .then(text => {
        const lines = text.trim().split('\n')
        const map = {}
        // skip header
        for (let i = 1; i < lines.length; i++) {
          const [id, name] = lines[i].split(',')
          if (id && name) {
            map[id.trim()] = { name: name.trim() }
          }
        }
        setUsers(map)
      })
      .catch(err => {
        console.error('Failed to load users.csv:', err)
        setUsers({}) // avoid infinite loading
      })
  }, [])

  // 2. Prevent form until users have loaded
  if (users === null) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="loginContainer">
          <p>Loading valid passkeys…</p>
        </div>
      </div>
    )
  }

  // 3. Handle login
  const handleLogin = e => {
    e.preventDefault()
    const key = passkey.trim()
    if (users[key]) {
      navigate(`/${key}`)
    } else {
      alert('Invalid passkey')
      setPasskey('')
    }
  }

  return (
<div className="page-wrapper">
      <Navbar />
      <div className="loginContainer">
    <form className="passkeyForm" onSubmit={handleLogin}>
    <input id="passkeyInput" type="text" value={passkey} maxLength="4" onChange={(e) => setPasskey(e.target.value)} autoComplete='off' required/>
    <button type="submit" id="passkeySubmit" >Connect</button>
    </form>
    </div>
    </div>
  )
}


