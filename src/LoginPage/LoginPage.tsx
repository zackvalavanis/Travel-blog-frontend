import React from "react";
import './LoginPage.css'
import axios from "axios";
import { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/sessions.json', {
        email: email,
        password: password,
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    setPassword('')
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
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}