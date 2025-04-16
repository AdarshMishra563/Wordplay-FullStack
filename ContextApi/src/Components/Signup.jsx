import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            await axios.post("https://game-full-stack.onrender.com/api/auth/register", {
                username,
                email,
                password,
            });
            alert("Signup successful! Please login.");
            navigate("/");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignup} className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Signup</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="block p-2 mb-2 w-full border"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                    className="bg-green-500 text-white p-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>

                {error && (
                    <p className="mt-2 text-red-500 text-sm">Signup failed. Try again.</p>
                )}
            </form>
        </div>
    );
};

export default Signup;
