import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Users} from './Users.jsx'

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
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
    <input id="passkeyInput" type="password" value={passkey} maxLength={4} onChange={(e) => setPasskey(e.target.value)} required/>
    <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login