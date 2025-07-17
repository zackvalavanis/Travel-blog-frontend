import './Main.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';


export function Main() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.jwt && localStorage.jwt.length > 0
  const storedName = localStorage.getItem('name');
  const [formattedName, setFormattedName] = useState('')

  const formatName = (storedName: string) => {
    var splitName = storedName.split('')
    var final = ''

    for (let i = 1; i < splitName.length; i++) {
      final += splitName[i].toLowerCase()
    }
    var formattedName = splitName[0] + final
    return formattedName
  }

  useEffect(() => {
    if (storedName) {
      const formattingName = formatName(storedName)
      setFormattedName(formattingName)
    }
  }, [])

  const start = () => {
    isLoggedIn ? navigate('/New Post') : navigate('/signup')
  }
  return (
    <div className='main-container'>
      {/* <img
        className='logo'
        src='./Screenshot 2025-07-03 at 12.37.01 PM.png'></img>
      <h1 style={{
        color: '#222',
        fontSize: '36px',
        fontWeight: '600',
        letterSpacing: '1px',
        textAlign: 'center',
        marginTop: '40px',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}>
        Welcome to Storyline
      </h1> */}
      <div className='image-main-container'>
        <img
          className='image-main'
          src='./F294F716-3138-4B66-9BB7-B8AEA3BFCD2E_1_105_c.jpeg'
          style={{ width: '100%', marginBottom: '5%', marginTop: '10%' }}
        ></img>
      </div>
      <div className='button-container'>
        {isLoggedIn ? (
          <h1 style={{ color: 'black' }}>Welcome Back, {formattedName}</h1>
        ) : (
          <>
            <button onClick={start}>Start Your Blogging Journey Today</button>
          </>
        )}
      </div>
    </div>
  );
}

{/* {isLoggedIn(
          <h1>hi</h1>
        ) : (
        <>
          <button onClick={start}>Start Your Blogging Journey Today</button>
        </>
        )}
      </div> */}