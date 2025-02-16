import React,{useState,useContext} from "react"
import UserContext from "../UserContext";




function Login() {
  
    const [username,setusername]=useState('')
    const [pass,setpass]=useState('')
const {setuser,kk}=useContext(UserContext);

const handleSubmit=(e)=>{
  
    e.preventDefault()
    setuser({username,pass})
}
  return(
<>
<div>
<h1>Login</h1>
<input type="text"  value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="username"/>{ "  "}
<input type="password" value={pass} onChange={(e)=>{setpass(e.target.value)}} placeholder="password"/>
<button onClick={handleSubmit}>submit</button>
<button onClick={kk}>kkkkkk</button>
</div>
</>
 )
  }

export default Login ;
