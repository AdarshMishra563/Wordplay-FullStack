import React, {  useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaTrophy } from "react-icons/fa";


const api= async()=>{
  const res= await fetch( "https://random-word-api.herokuapp.com/word?number=150&length=5")
   const info= await res.json()
  
    
    return info
}

  

export default   function Game(){

const [name,setname]=useState("xxx")
const [wins,setwins]=useState(0)
 const [words,setwords]=useState('')
 const[gameover,setgameover]=useState(false)
 const [guesses,setguesses]=useState(Array(6).fill(null))
const [currentguess,setcurrentguess]=useState('')
const[info,setinfo]=useState({username:"",wins:""})
const [id,setid]=useState({wins:0,data:[{username:"xxxx"}]})
const[count,setcount]=useState(0);
const [rank,setrank]=useState([])
const getrank=async ()=>{
  try{ 
    const res= await axios.get('https://game-full-stack.onrender.com');

return res;
  }catch(err){
    console.log(err)
  }
}
  



useEffect(()=>{
  getrank().then((data)=>{ const array =data.data.data;
    const sortedplayers=array.sort((a, b) => b.wins - a.wins);
    console.log(sortedplayers);
    setrank(sortedplayers);
  


})

  
    const getUserFromToken = (token) => {
        try {
          const decoded = jwtDecode(token);
          
          return decoded; // Returns user data like { id: '123', email: 'user@example.com', exp: 1712134123 }
        } catch (error) {
          console.error("Invalid Token", error);
          return null;
        }
      };
      const token = localStorage.getItem("token");
      const k=getUserFromToken(token);
      
    
    const incrementWinCount = async (_id) => {
        try {
    
            const response = await axios.post("http://localhost:3000/api/auth/start", { _id });
            setid(response.data)
            console.log("Win count updated:", response.data);
        } catch (error) {
            console.error("Error updating win count:", error);
        }
    };
    incrementWinCount(k.id)

},[count])
useEffect(()=>{
  
    const getUserFromToken = (token) => {
        try {
          const decoded = jwtDecode(token);
          
          return decoded; // Returns user data like { id: '123', email: 'user@example.com', exp: 1712134123 }
        } catch (error) {
          console.error("Invalid Token", error);
          return null;
        }
      };
      const token = localStorage.getItem("token");
      const k=getUserFromToken(token);
      
    
    const incrementWinCount = async (_id) => {
        try {
    
            const response = await axios.post("http://localhost:3000/api/auth/userwin", { _id });
            setid(response.data)
            console.log("Win count updated:", response.data);
        } catch (error) {
            console.error("Error updating win count:", error);
        }
    };
    if(gameover){
      incrementWinCount(k.id)

    }
    

      
      // Example usage
      
       // Fetch token from localStorage or cookies
       
       
      
     


  
  
    
   
    
  },[gameover])
 console.log(id.data[0].username)

useEffect(()=>{const handletype=(e)=>{
  if(gameover){
    return;
  }
  if(gameover){
    setcount(count+1)
  }
  if(e.key==='Enter'){
    if(currentguess.length !==5){
      
      return 
    }
   

    const newGuesses=[...guesses]
    newGuesses[guesses.findIndex(v=>v==null)]=currentguess
    setguesses(newGuesses)
    setcurrentguess('')
    
    

    const isCorrect=words===currentguess;
   if(isCorrect){
    setgameover(true)
   } 
       
 
  }

  if(currentguess.length>=5){
    return ;
  }
const isLetter=e.key.match(/^[a-z]{1}$/)!=null
if(isLetter){
setcurrentguess(o=>{ return o+e.key})}


if(e.key==='Backspace'){
  setcurrentguess(currentguess.substring(0, currentguess.length -1))
  return 
}



}

window.addEventListener('keydown',handletype)
return ()=>window.removeEventListener('keydown',handletype)



},[currentguess,gameover,words,guesses])



 useEffect(()=>{api().then((i)=>{
  const randomword=i[Math.floor(Math.random()*150)]
setwords(randomword)
console.log(randomword)
 }
)

},[])

return(<>


<div className="w-full  flex text-center text-2xl text-white capitalize  h-16 justify-center bg-gray-800">!!      {id.data[0].username}  <p className="ml-4 mr-8 text-red-400">    Wins : {id.data[0].wins}</p>   !!       </div>

<div key={"hh"} className=" bg-gray-200 h-screen place-items-center text-3xl  gap-[5px]">
  !!WordPlay!!
 <div className="relative "> {
    guesses.map((guess,i)=>{
      const isCurrentguess=i===guesses.findIndex(v=>v==null)
      return(<Line className=""
        guess={isCurrentguess ? currentguess :guess ?? ""}
        isfinal={!isCurrentguess && guess!=null }
        words={words}
        />)
    })
  }</div><div className=" absolute  right-0 top-[38%] transform -translate-y-1/2 w-[20%] h-64 bg-gray-300 flex items-center justify-center "> <div className="w-full max-w-md mx-auto p-2 bg-gray-200 border-2 border-gray-400 shadow-md rounded-lg h-[400px] overflow-y-auto">
  <h2 className="text-black font-bold  text-center mb-4">Leaderboard</h2>
  <ul>
    {rank.map((player, index) => (
      <li key={index} className="border border-gray-800 rounded-md flex justify-between">
        <span className=" flex  text-xl text-black ">{index+1}. { player.username}  :      {  player.wins}<FaTrophy className="mt-1 ml-1"/> </span>
        
  
      </li>
    ))}
  </ul>
</div></div>
<Win gameover={gameover} words={words}
/>
  </div> </>
)}
function Line({guess,isfinal,words,}){
  const boxes=[]
for(let i=0;i<5;i++){
  const char=guess[i]

  let className=""
  if(isfinal){
    if(char===words[i]){
      className+='bg-green-400'
    }
    else
    if(words.includes(char)){
      className+='bg-yellow-400'
    }
  else{
    className+='bg-gray-600'
  }}
 
  boxes.push(<div key={i} className={" w-12 h-12 border-2 border-black  place-items-center capitalize md:uppercase "+className}><div>{char}</div></div>)

}



  return<div className=" mt-1 flex gap-[5px]">
    {boxes}

  </div>
}
function Win({gameover}){
 
 
 if(gameover){
  return <div className="bg-pink-600 text-white mt-4 ml-2 rounded-lg text-4xl w-22 ">!!!!YouWin!!!!</div>}
}
