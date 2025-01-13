
import React from 'react'
import '../style.css' 

function Navbar() {
  return (
    <>
    <header className="navbar">
      <h1 className="navbar-title">move out project</h1>
      <nav>
        <ul className="navbar-links">
          <li><a href="#furniture">FURNITURE</a></li>
          <li><a href="#food">FOOD</a></li>
          <li><a href="#bathroom">BATHROOM</a></li>
          <li><a href="#books">BOOKS</a></li>
        </ul>
      </nav>
    </header></>
  )
}


export default Navbar