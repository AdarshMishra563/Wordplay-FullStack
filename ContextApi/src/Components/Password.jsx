import React, { useState } from 'react'
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  Link } from "react-router-dom";
function Password() {
    const [login,setlogin]=useState(false);

    const [change,setchange]=useState(false);
    const [password,setpassword]=useState("")
const [data,setdata]=useState({data:{messege:""}})
const [email,setemail]=useState("");
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handlepass=async (e)=>{
    e.preventDefault();
    try{
        const data=await axios.get(`https://game-full-stack.onrender.com/api/auth/get/${email}`);
       if(data.data.status){
        
        setchange(true);
        
        
       }
       setdata(data)
       console.log(await data)
    }catch(err){
        console.log(err)
    }


}
const changepass= async (e)=>{
    e.preventDefault();
    try{
const changepassword=await axios.put(`https://game-full-stack.onrender.com/api/auth/password/${email}`,{password})


console.log(changepassword);
setdata(changepassword);

if(changepassword.data.status=true){
    setlogin(true)
}
console.log(changepassword.data.status)
    }catch(e){console.log(e)}
}


  return (<>
    <div className='flex justify-center items-center h-96 '><form className='p-4 bg-gray-100 rounded-lg shadow-md ' onSubmit={handlepass}><p className='mb-4'>Enter Email</p><input type='email' onChange={(e)=>{setemail(e.target.value)}}  className="border-2  border-black mt-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none  "/>
    <button type='submit' className='border-2 rounded-md border-black border-l-0'>Find User</button></form>
    
    <div>{change?<form className=" ml-8 bg-gray-100 p-4 rounded-lg shadow-md" onSubmit={changepass}><p className='mb-2 '> New Password:</p><div className=' flex relative'><input type={showPassword ? "text" : "password"} onChange={(e)=>{setpassword(e.target.value)}} className='border-2  border-black mt-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none   ' required/><span className="mt-3 absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 " onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span></div><button className="border-2 border-black border-l-0 rounded-md" type='submit'>Change</button></form>:""}</div>
    </div>
    <div className='flex justify-center items-center'><p className='text-blue-600'>{data.data.message}</p></div>
    <div className='flex justify-center items-center  '>{login&&<Link className ='rounded-md border-2 border-black hover:bg-blue-400 hover:scale-110' to="/">Go to Login</Link>}</div></>
    
  )
}

export default Password;
