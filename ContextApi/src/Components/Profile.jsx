import"../index.css"
import UserContext from '../UserContext';
import { useContext } from 'react';

// https://video-ssl.itunes.apple.com/itunes-assets/Video221/v4/b9/f9/aa/b9f9aa22-72bc-1a8c-6410-d1bc42521890/mzvf_1544412418733521443.720w.h264lc.U.p.m4v"
// https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json
import React, { useEffect, useRef, useState } from 'react';

const api=async ()=>{
  const data= await  fetch(" https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json");
  const result= data.json()
  return result ;
}

const Profile = () => {
  const [values,setvalues]=useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying,setisPlaying]=useState(false);
  const [vUrl,setvUrl]=useState('https://video-ssl.itunes.apple.com/itunes-assets/Video221/v4/b9/f9/aa/b9f9aa22-72bc-1a8c-6410-d1bc42521890/mzvf_1544412418733521443.720w.h264lc.U.p.m4v')
  const [data,setdata]=useState([])
  const videoRef = useRef(vUrl);
  const [isReady, setIsReady] = React.useState(false);
  const min=0;
  const max=videoRef.current.duration;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
useEffect(()=>{
api().then((e)=>{setdata(e.categories[0].videos);
 
});



},[])



useEffect(()=>{setisPlaying(false); 
  
  
},[vUrl , ])

  // List of videos to play in sequence
  const playlist = [
    { title: 'Intro Video',image:"https://i.ytimg.com/vi/GrBrC3goZYM/hqdefault.jpg", url: 'https://video-ssl.itunes.apple.com/itunes-assets/Video221/v4/b9/f9/aa/b9f9aa22-72bc-1a8c-6410-d1bc42521890/mzvf_1544412418733521443.720w.h264lc.U.p.m4v' },
    { title: 'Main Video',image:"https://tse4.mm.bing.net/th?id=OIP.Hc2KnyE9uznxJZE9ByAY3AHaJQ&pid=Api&P=0&h=180", url: 'https://video-ssl.itunes.apple.com/itunes-assets/Video221/v4/b9/f9/aa/b9f9aa22-72bc-1a8c-6410-d1bc42521890/mzvf_1544412418733521443.720w.h264lc.U.p.m4v' },
    { title: 'Outro Video',image:"https://tse3.mm.bing.net/th?id=OIP.72lXnsR6Z2f7E9ECMAuIUAHaEK&pid=Api&P=0&h=180", url: "https://videos.pexels.com/video-files/3296054/3296054-uhd_2732_1440_25fps.mp4" },
  ];

  // Handle end of video to play the next one
  const handleVideoEnd = () => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };
const PlayPause=()=>{
  if(!isPlaying){
    videoRef.current.play();
    setisPlaying(true)
  }else{videoRef.current.pause();
    setisPlaying(false)
  }
}

const handleTime = () => {
  const video = videoRef.current;
  if (video) {
    setCurrentTime(video.currentTime);
  }
};
const percentage = ((currentTime - min) / (max - min)) * 100;

const k=(videoRef.current.duration)%60;
const j=(Math.floor((currentTime)%60))/10;
const l=(Math.floor((currentTime)%60))%10;
  return (
    <div className="p-4 place-start">
      <h2 className="text-xl mb-4 ml-[6%]">Video Playlist Player</h2>

      <div className=" ">
        <div className="w-[70%] ml-[6%] ">
          <div className="mb-2 text-lg font-semibold place-items-start">
            Now Playing: {playlist[currentVideoIndex].title}
          </div>

          <video
            ref={videoRef}
            key={currentVideoIndex} 
            
            
            experimentalSvgIcons={true}// Reload video when index changes
            

            controls={true}
            preload="auto"
           src={vUrl}
           onTimeUpdate={()=>{
            handleTime()
           }}
           onPlay={()=>{setisPlaying(true);
            
           }}
           onPause={()=>{
            setisPlaying(false)
           }}
            onEnded={handleVideoEnd}  // Move to next video when finished
            className="rounded-xl shadow-lg w-fit"
          >
            Your browser does not support the video tag.
          </video>
          
          <button onClick={()=>{PlayPause();
            
          }} className='border-2 border-black'>{isPlaying?"Pause":"Play"}</button>
            <span>{Math.floor((currentTime)/60)}:{Math.floor(j)}{Math.floor(l)}</span>
          <input type='range'      className="w-[60%] h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer accent-black bg-linear-gradient(to right white)" value={currentTime}  onChange={(e)=>{
            
            const newTime = Number(e.target.value);
            const video = videoRef.current;
            if (video) {
              video.currentTime = newTime;
            }
            setCurrentTime(newTime);
           
          }}  style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`
        }}
            min={0} max={videoRef.current.duration} ></input><span>{Math.floor((videoRef.current.duration)/60)}:{Math.floor(k)}</span>
        </div>
        <div className="w-2/6 ml-8 flex-initial ">
        
       
            {data.map((video, index) => (
             
                <div className='     relative ' key={index} onClick={()=>{
                  
                  setvUrl(video.sources[0])
                }}><h2 className='absolute  flex text-white ml-2 mb-2 bottom-2  '>{video.title}</h2><img className="rounded-xl w-96  mb-4 hover:scale-110 transition-scale duration-700 w-[60%] h-[28%]  ease-in-out " src={video.thumb}></img></div>
              
            ))}
        
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
