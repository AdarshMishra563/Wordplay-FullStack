import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaTrophy, FaCrown, FaChevronDown, FaChevronUp, FaTimes, FaQuestionCircle, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const fiveLetterWords = [
  "apple", "brain", "crisp", "dwarf", "eagle", 
  "flame", "globe", "happy", "igloo", "jolly",
  "koala", "lemon", "mango", "noble", "olive",
  "peach", "queen", "robin", "sunny", "tiger",
  "umbra", "vivid", "whale", "xenon", "yacht",
  "zebra", "acute", "baker", "crane", "dance",
  "earth", "fable", "grape", "haste", "inbox",
  "jumpy", "kneel", "latch", "mirth", "nymph",
  "otter", "prism", "quilt", "rover", "swoop",
  "tulip", "udder", "vowel", "wrist", "xerox"
];


const randomlocal = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

const api = async () => {
  const res = await fetch("https://random-word-api.herokuapp.com/word?number=150&length=5");
  const info = await res.json();
  return info;
};

export default function Game() {
  const navigate = useNavigate();
  const [words, setwords] = useState('');
  const [gameover, setgameover] = useState(false);
  const [guesses, setguesses] = useState(Array(6).fill(null));
  const [currentguess, setcurrentguess] = useState('');
  const [id, setid] = useState({ wins: 0, data: [{ username: "xxxx" }] });
  const [count, setcount] = useState(0);
  const [rank, setrank] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showLossModal, setShowLossModal] = useState(false);
  const [allGuessesUsed, setAllGuessesUsed] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);


  useEffect(()=>{

    const token = localStorage.getItem("token");

    if(!token){
      navigate("/")
    }
  },[])
 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getrank = async () => {
    try {
      const res = await axios.get('https://game-full-stack.onrender.com');
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getrank().then((data) => {
      const array = data.data.data;
      const sortedplayers = array.sort((a, b) => b.wins - a.wins);
      setrank(sortedplayers);
    });

    const getUserFromToken = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Invalid Token", error);
        return null;
      }
    };
    const token = localStorage.getItem("token");
    const k = getUserFromToken(token);

    const incrementWinCount = async (_id) => {
      try {
        const response = await axios.post("https://game-full-stack.onrender.com/api/auth/start", { _id });
        setid(response.data);
      } catch (error) {
        console.error("Error updating win count:", error);
      }
    };
    incrementWinCount(k.id);
  }, [count]);

  useEffect(() => {
   
    const allGuessesFilled = guesses.every(guess => guess !== null);
    if (allGuessesFilled && !gameover) {
      setAllGuessesUsed(true);
      setShowLossModal(true);
    }
  }, [guesses, gameover]);

  useEffect(() => {
    const getUserFromToken = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Invalid Token", error);
        return null;
      }
    };
    const token = localStorage.getItem("token");
    const k = getUserFromToken(token);

    const incrementWinCount = async (_id) => {
      try {
        const response = await axios.post("https://game-full-stack.onrender.com/api/auth/userwin", { _id });
        setid(response.data);
      } catch (error) {
        console.error("Error updating win count:", error);
      }
    };
    if (gameover) {
      incrementWinCount(k.id);
    }
  }, [gameover]);

  useEffect(() => {
   const handletype = (e) => {
  if (gameover || allGuessesUsed) {
    return;
  }
 if (['Enter', 'Backspace'].includes(e.key)) {
    e.preventDefault();}
  if (e.key === 'Enter') {
    if (currentguess.length !== 5) {
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex(v => v == null)] = currentguess;
    setguesses(newGuesses);
    setcurrentguess('');

    const isCorrect = words === currentguess;
    if (isCorrect) {
      setgameover(true);
    }
    return;
  }

  if (e.key === 'Backspace') {
    setcurrentguess(prev => prev.slice(0, -1));
    return;
  }

  
  if (currentguess.length < 5) {
    const isLetter = e.key.match(/^[a-z]{1}$/i) != null; 
    if (isLetter) {
      setcurrentguess(prev => prev + e.key.toLowerCase());
    }
  }
};
    window.addEventListener('keydown', handletype);
    return () => window.removeEventListener('keydown', handletype);
  }, [currentguess, gameover, words, guesses, allGuessesUsed]);

  useEffect(() => {
    api().then((i) => {
      const randomword = i[Math.floor(Math.random() * 150)];
      setwords(randomword)

     
      
    }).catch(() => {
      
     setwords(randomlocal)

    });;
  }, []);

  const handleRefresh = () => {
    navigate(0);
  };

 const handleKeyClick = (key) => {
  if (gameover || allGuessesUsed) return;
  
  if (key === 'ENTER') {
    if (currentguess.length === 5) {
      const newGuesses = [...guesses];
      newGuesses[guesses.findIndex(v => v == null)] = currentguess;
      setguesses(newGuesses);
      setcurrentguess('');

      const isCorrect = words === currentguess;
      if (isCorrect) {
        setgameover(true);
      }
    }
  } else if (key === 'BACK') {
    setcurrentguess(prev => prev.slice(0, -1));
  } else if (currentguess.length < 5) {
    setcurrentguess(prev => prev + key.toLowerCase());
  }
};
  const closeLossModal = () => {
    setShowLossModal(false);
  };
  const inputRef = useRef(null);


useEffect(() => {
  inputRef.current?.focus();
}, []);
const leaderboardRef = useRef(null);
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (leaderboardRef.current && !leaderboardRef.current.contains(event.target)) {
      setShowLeaderboard(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-b to-gray-300 from-gray-900">
      <input
  ref={inputRef}
  type="text"
  className="opacity-0 absolute"
  value={currentguess}
  onChange={() => {}}
  
/>

      {showLossModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-red-500">Game Over</h2>
              <button 
                onClick={closeLossModal}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-white mb-4">You've used all your guesses!</p>
            <p className="text-xl font-bold text-yellow-400 mb-6">
              The correct word was: <span className="uppercase">{words}</span>
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaRedo className="mr-2" /> Play Again
              </button>
            </div>
          </div>
        </div>
      )}

     
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-400">How to Play</h2>
              <button 
                onClick={() => setShowHowToPlay(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <div className="text-white space-y-4">
              <p>1. Type a 5-letter word and press Enter</p>
              <p>2. Letters in the word but wrong position will turn <span className="bg-yellow-500 text-white px-1">YELLOW</span></p>
              <p>3. Letters in the correct position will turn <span className="bg-green-500 text-white px-1">GREEN</span></p>
              <p>4. Guess the word correctly within 6 attempts</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     <div className="w-full flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 py-2 bg-gray-800 text-white">
  
  <div className="flex items-center text-lg sm:text-xl capitalize mb-2 sm:mb-0">
    <FaCrown className="text-yellow-400 mr-2" />
    <span className="truncate max-w-[120px] sm:max-w-none">{id.data[0].username}</span> 
    <p className="ml-2 sm:ml-4 text-red-400">Wins: {id.data[0].wins}</p>
  </div>

  
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full sm:w-auto">
    <button 
      onClick={() => setShowHowToPlay(true)}
      className="flex items-center bg-gray-700 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-gray-600 shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
    >
      <FaQuestionCircle className="mr-1 sm:mr-2" /> How to Play
    </button>
    
    <div className="relative" ref={leaderboardRef}>
      <button 
        className="flex items-center bg-gray-700 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-gray-600 shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
        onClick={() => setShowLeaderboard(!showLeaderboard)}
      >
        {showLeaderboard ? <FaChevronUp className="mr-1 sm:mr-2" /> : <FaChevronDown className="mr-1 sm:mr-2" />}
        Leaderboard
      </button>
    </div>
    
    <button 
      className="flex items-center bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-blue-700 shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
      onClick={handleRefresh}
    >
      <FaRedo className="mr-1 sm:mr-2" /> Restart
    </button>
    
    <button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm shadow-sm hover:shadow-md transition-shadow"
    >
      Logout
    </button>
  </div>
</div>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">WordPlay</h1>
        
        {showLeaderboard && (
          <div className="w-full max-w-md mb-8 bg-gray-100 border-2 border-gray-400 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-bold text-center">
              Leaderboard
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {rank.map((player, index) => (
                <li 
                  key={index} 
                  className={`p-3 border-b border-gray-300 flex justify-between items-center ${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="font-bold w-6 text-center">
                      {index + 1}.
                    </span>
                    <span className="ml-2">{player.username}</span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">{player.wins}</span>
                    <FaTrophy className="text-yellow-500" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative">
          {guesses.map((guess, i) => {
            const isCurrentguess = i === guesses.findIndex(v => v == null);
            return (
              <Line
                key={i}
                guess={isCurrentguess ? currentguess : guess ?? ""}
                isfinal={!isCurrentguess && guess != null}
                words={words}
              />
            );
          })}
        </div>
        
        <Win gameover={gameover} words={words} />
        
       
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
          <div className="flex justify-center mb-1">
            {'QWERTYUIOP'.split('').map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="m-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-md hover:bg-gray-600 active:bg-gray-500 transition-colors"
                disabled={gameover || allGuessesUsed}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="flex justify-center mb-1">
            {'ASDFGHJKL'.split('').map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="m-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-md hover:bg-gray-600 active:bg-gray-500 transition-colors"
                disabled={gameover || allGuessesUsed}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleKeyClick('ENTER')}
              className="m-1 p-3 bg-blue-600 text-white border border-blue-700 rounded-md hover:bg-blue-700 active:bg-blue-500 transition-colors text-sm"
              disabled={gameover || allGuessesUsed}
            >
              ENTER
            </button>
            {'ZXCVBNM'.split('').map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="m-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-md hover:bg-gray-600 active:bg-gray-500 transition-colors"
                disabled={gameover || allGuessesUsed}
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => handleKeyClick('BACK')}
              className="m-1 p-3 bg-red-600 text-white border border-red-700 rounded-md hover:bg-red-700 active:bg-red-500 transition-colors"
              disabled={gameover || allGuessesUsed}
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({ guess, isfinal, words }) {
  const boxes = [];
  for (let i = 0; i < 5; i++) {
    const char = guess[i];
    let className = "flex items-center  shadow-sm shadow-purple-300 rounded-md justify-center w-12 h-12 border-2 font-bold text-xl ";
    
    if (isfinal) {
      if (char === words[i]) {
        className += 'bg-green-500 text-white border-green-600';
      } else if (words.includes(char)) {
        className += 'bg-yellow-500 text-white border-yellow-600';
      } else {
        className += 'bg-gray-600 text-white border-gray-700';
      }
    } else {
      className += 'border-gray-400 bg-gray-300 ';
    }

    boxes.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }

  return <div className="my-1  flex gap-2">{boxes}</div>;
}

function Win({ gameover, words }) {
  if (gameover) {
    return (
      <div className="mt-6 p-4 absolute bg-green-600 text-white rounded-lg text-2xl font-bold animate-bounce">
        You Win! The word was: {words.toUpperCase()}
      </div>
    );
  }
  return null;
}