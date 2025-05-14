import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedText from "./Animated";
import { motion } from 'framer-motion';
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const text="SignUp"
    const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.25, 
        delayChildren: 0.6 * i,
      }
    }),
  };

  const child = {
    hidden: { opacity: 0, y: `0.25em` },
    visible: { 
      opacity: 1, 
      y: `0em`,
      transition: { 
        duration: 0.6, 
        ease: [0.2, 0.65, 0.3, 0.9] 
      }
    },
  };


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
             
            navigate("/");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
           <div className="container">
      <div className="tub-shape ">
<form style={{zIndex:9999,marginTop:160}} onSubmit={handleSignup} className="p-6  rounded-lg shadow-lg">
               <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#374151', // gray-700
      }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>

                <input
                    type="text"
                    placeholder="Username"
                    className="block p-2 mb-2 w-full  border bg-gradient-to-br to-gray-300 from-gray-100 "
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="block p-2 mb-2 w-full  border bg-gradient-to-br to-gray-300 from-gray-100 "
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block p-2 mb-2 w-full border bg-gradient-to-br to-gray-300 from-gray-100 "
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className=" bg-gradient-to-br to-gray-900 from-gray-100  text-white p-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'none', display: 'block' }} width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#E5E7EB" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
  </svg> : "Signup"}
                </button>

                {error && (
                    <p className="mt-2 text-red-500 text-sm">Signup failed. Try again.</p>
                )}
            </form>


      </div>
      <div className="content">
   <div className="mt-72"> <AnimatedText text="Wordplay"/></div>
      </div>
    </div>
    );
};

export default Signup;
 