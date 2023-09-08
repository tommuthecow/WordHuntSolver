import React, { useState, useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import Grid from './components/Grid';
import WordList from './components/WordList';
import Login from './components/Login';
import Registration from './components/Registration';
import huntWords from './functions/huntWords';
import { auth } from './firebase';
import { register, login, logout } from './auth';

const dictionary = require('./functions/buildTrie');

const initial = [
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
];

function App() {
  const [whArr, setWhArr] = useState(() => getDeepCopy(initial));
  const [foundWords, setFoundWords] = useState(new Set());
  const [user, setUser] = useState(null);

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    if (!user) {
      alert('Please log in to play.');
      return;
    }

    var val = e.target.value || '';
    var grid = getDeepCopy(whArr);

    if (val.length === 0 || /^[a-zA-Z]+$/.test(val)) {
      grid[row][col] = val.toUpperCase();
    }

    setWhArr(grid);
  }

  function handleHunt() {
    const isGridFilled = whArr.every(row => row.every(cell => cell !== ''));
    
    if (isGridFilled) {
      const words = huntWords(whArr, dictionary); // Call the huntWords function with the grid
      setFoundWords(words);
    } else {
      alert('Please fill all cells in the grid.');
    }
  }

  function resetGrid() {
    setWhArr(getDeepCopy(initial));
    setFoundWords(new Set());
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.email);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

const handleLogin = (email, password) => {
  login(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user.email);
    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
};

const handleLogout = () => {
  logout()
    .then(() => {
      setUser(null);
    })
    .catch((error) => {
      console.error('Logout failed:', error);
    });
};

const handleRegister = (email, password) => {
  register(email, password)
    .then(() => {
      console.log('Registration successful');
      handleLogin(email, password);
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    });
};

  return (
    <div className="App">
      <div className="App-header">
        <div className="completeContainer">
          {user ? (
            <div className="completeContainer">
              <div className="gridHeaderContainer">
                <Header />
                <Grid whArr={whArr} onInputChange={onInputChange} />
                  <div className="buttonContainer">
                    <button className="huntButton" onClick={handleHunt}>
                      HUNT
                    </button>
                    <button className="resetButton" onClick={resetGrid}>
                      RESET
                    </button>
                    <button className="logoutButton" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  </div>
              </div>
              <WordList foundWords={foundWords} />
            </div>
          ) : (
            <div className='loginContainer'>
              <h2> WORD HUNT SOLVER</h2>
              <div className="loginRegister">
                <Login onLogin={handleLogin} />
                <Registration onRegister={handleRegister} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
