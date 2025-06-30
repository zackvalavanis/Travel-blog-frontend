import './Main.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';


export function Main() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.jwt && localStorage.jwt.length > 0

  const start = () => {
    isLoggedIn ? navigate('/New Post') : navigate('/signup')
  }
  return (
    <div className='main-container'>
      <div className='button-container'>
        <button onClick={start}>Start Your Blogging Journey Today</button>
      </div>
    </div>
  );
}
