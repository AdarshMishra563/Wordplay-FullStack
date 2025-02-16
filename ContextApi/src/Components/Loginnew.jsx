import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [span,setspan]=useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://game-full-stack.onrender.com/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            console.log(data.token)
            navigate("/game");
        } catch (error) {
            setspan(true)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl mb-4">Login</h2>
                <input type="email" placeholder="Email" className="block p-2 mb-2" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="block p-2 mb-2" onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button><span className="text-red-400">{span? "Invalid Credentials    ":""}</span>
                <p className="mt-2 text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
                   { span?<Link className="text-red-400" to='/password'>   or  Forgot Password?</Link>:""}
                </p>
            </form>
        </div>
    );
};

export default Login;
