import React from 'react'
import { useParams } from 'react-router-dom'
import { Users } from './Users.jsx'

function Categ() {
    const {passkey} = useParams()
    const userData = Users[passkey]
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
  return (
    <>
    <h2>hELLLO, {userData.name}</h2>
    </>
  )
}

export default Categ