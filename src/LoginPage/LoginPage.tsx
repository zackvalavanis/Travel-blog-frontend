import React from "react";
import './LoginPage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from 'react';

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { name, setName } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/sessions.json', {
        email: email,
        password: password,
      })
      const formattedName = response.data.email.split('@')[0].toUpperCase();
      setName(formattedName);
      localStorage.setItem('jwt', response.data.jwt);
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    setPassword('')
    // navigate('/')
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <form
          className='login-form'
          onSubmit={handleLogin}
        >
          <label
            className='label1'
          >
            Email:
          </label>
          <input
            className='input1'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
          <label
            className='label2'
          >
            Password
          </label>
          <input
            className='input2'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
          <button
            className='button-login'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}