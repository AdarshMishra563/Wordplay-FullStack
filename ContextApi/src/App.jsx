
// https://video-ssl.itunes.apple.com/itunes-assets/Video221/v4/b9/f9/aa/b9f9aa22-72bc-1a8c-6410-d1bc42521890/mzvf_1544412418733521443.720w.h264lc.U.p.m4v"
// https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json
import React, {Suspense, useEffect,useLayoutEffect, useRef, useState,useCallback } from 'react';
import Profile from './Components/Profile';
import MessagingApp from './Components/Message';
import WeatherApp from './Components/Weather';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginnew from './Components/Loginnew';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import { useForm } from "react-hook-form";
import Password from './Components/Password';
import Game from './Components/game';
const LazyComponent = React.lazy(() => import('./Components/Profile'));
const api=async()=>{
  const response=await axios.get(`http://localhost:5500/`)
   
   
    return response;
    
  
}


// export default  function App () {
//   const [data,setdata]=useState([]);
//   const [user,setuser]=useState({email:"",username:"",password:""})
//   const { register, handleSubmit, reset } = useForm();
// useEffect( ()=>{
// api().then((data)=>{setdata(data.data.data)})
// },[])

//   const onSubmit=async (data)=>{
   
   
//     try{
//       const response=await axios.post(`http://localhost:5500/`,data,{
//         headers: { "Content-Type": "application/json" },
        
//       });
      
//       console.log(await response.data)

//     reset();

//     }catch(e){console.log(e)}
//    };

//   return(<> <div> 
//     <h2>Send Data to MongoDB</h2>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" {...register("username", { required: true })} placeholder="Name" />
//       <input type="email"  {...register("email", { required: true })} placeholder="Email" /> 
//       <input type="password"  {...register("password", { required: true })} placeholder="Password" />  
//       <button type="submit">Submit</button>
//     </form>
//   </div>
  
//   </>)
// }
export default function App(){

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Loginnew />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/password' element={<Password/>}/>
            <Route path='/game' element={<Game/>}/>
        </Routes>
    </Router>
);




}