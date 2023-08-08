import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')

  const navigate = useNavigate()


  function submitHandler(){
    const getToken = async()=>{
       const resp = await axios.post('http://localhost:3000/admin/login',{
        username,
        password
       },{
        headers:{
          'content-Type':'application/json'
        }
       })

       const token = resp.data.token

       localStorage.setItem('token',token)

       setPassword('')
       setUsername('')

       alert('logged in successfully')

       navigate('/')

    }

    getToken()
  }

  return (
    <div className="login-wrapper">
       <div className="login-container">
          <div className="input-wrapper">
            <h1 className="heading" style={{marginBottom:'30px'}}>Login</h1>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="input" placeholder="Username"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="input" placeholder="Password"/>
            <button onClick={submitHandler} className="btn demo-btn">Submit</button>
          </div>
       </div>
    </div>
  )
}
