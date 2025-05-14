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
  <form onSubmit={handleLogin} className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="block p-2 mb-2 w-full border"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block p-2 mb-2 w-full border"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <span className="text-red-400 block mt-2">
                    {span ? "Invalid Credentials" : ""}
                </span>

                <p className="mt-2 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600">
                        Sign up
                    </Link>
                    {span ? (
                        <Link className="text-red-400 ml-2" to="/password">
                            or Forgot Password?
                        </Link>
                    ) : (
                        ""
                    )}
                </p>
            </form>