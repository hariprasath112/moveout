import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Users} from './Users.jsx'
import Navbar from '../components/Navbar.jsx'

function Login() {
    const [passkey,setPasskey] = React.useState('')
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        ////////backend codeeeee///////
        if(Users[passkey]){
            navigate(`/${passkey}`)
        }else{
            alert('Invalid passkey')
        }
    }
  return (
     <div className="page-wrapper">
      <Navbar />
      <div className="loginContainer">
    <form className="passkeyForm" onSubmit={handleLogin}>
    <input id="passkeyInput" type="text" value={passkey} maxLength="4" onChange={(e) => setPasskey(e.target.value)} autoComplete='off' required/>
    <button type="submit" id="passkeySubmit">Login</button>
    </form>
    </div>
    </div>
  )
}

export default Login