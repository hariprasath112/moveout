import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'
import { Users, categ
 } from '../components/Data.jsx'

function Categ() {
    const {passkey} = useParams()
    const navigate    = useNavigate()
    const userData = Users[passkey]
    
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }

   
  const handleBoxClick = (item) => {
    // each top-level item is type:"end", so just fire off submit URL
    navigate(`/${passkey}/submit/${item.value}`);
  };


  return (
    <>
    <Navbar />
    <h2>&ensp;You are at {userData.name}</h2>
    <div className="grid-container">
        {categ.map((item) => (
          <Box
            key={item.id}
            image={item.image}
            text={item.text}
            /* pass a click handler that calls handleBoxClick(item) */
            onClick={() => handleBoxClick(item)}
          />
        ))}
      </div>
    </>
  )
}
export default Categ

