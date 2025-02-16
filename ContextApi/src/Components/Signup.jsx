import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/auth/register", { username, email, password });
            alert("Signup successful! Please login.");
            navigate("/");
        } catch (error) {
            setspan(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignup} className="p-6 bg-gray-100 rounded-lg shadow-lg shadow-r-lg">
                <h2 className="text-xl mb-4">Signup</h2>
                <input type="text" placeholder="Username" className="block p-2 mb-2" onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" className="block p-2 mb-2" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="block p-2 mb-2" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Signup</button>
                
            </form>
            
        </div>
    );
};

export default Signup;
