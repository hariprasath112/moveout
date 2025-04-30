
// import React from 'react'
// import '../style.css' 

// function Navbar() {
//   return (
//     <>
//     <header className="navbar">
//       <a href="/:passkey">
//       <h1 className="navbar-title"> move out project</h1>
//       </a>
//     </header></>
//   )
// }


// export default Navbar

// src/components/Navbar.jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import '../style.css'

function Navbar() {
  // pull the passkey right off the current URL
  const { passkey } = useParams()

  // if you’re on a route that doesn’t have a passkey yet,
  // you can fall back to “/login” or “/”:
  const homePath = passkey ? `/${passkey}` : '/login'

  return (
    <header className="navbar">
      <Link to={homePath} className="navbar-title">
      <h1 className="navbar-title"> move out project</h1>
      </Link>
    </header>
  )
}

export default Navbar
