import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const  data  = await axios.get("http://localhost:3000/", {
                    headers: { Authorization: token },
                });
                setUser(data.data.data);
                
            } catch (error) {
                console.error("Error fetching user");
            }
        };
        fetchUser();
    }, []);
console.log(user)
    return (
        <div className="p-10">
            <h1 className="text-2xl">Welcome to Dashboard</h1>
            {user.map((e,i)=><div  className="border-2 border-black w-80 bg-gray-400" key={i}>{e.username}-email:{e.email}</div>)} 
        </div>
    )
};

export default Dashboard;
