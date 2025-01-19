import React from 'react'
import { useParams } from 'react-router-dom'
import { Users } from './Users.jsx'
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'

function Categ() {
    const {passkey} = useParams()
    const userData = Users[passkey]
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
  return (
    <>
    <Navbar />
    <h2>hELLLO, {userData.name}</h2>
    <Box />
    </>
  )
}

export default Categ