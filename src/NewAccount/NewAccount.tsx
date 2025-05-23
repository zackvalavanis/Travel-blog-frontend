import React from 'react'
import './NewAccount.css'
import axios from 'axios'
import { useState } from 'react'

type Signup = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export function SignUp() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_confrimation, setPassword_confirmation] = useState<string>('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const payload: Signup = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confrimation
    }
    try {
      const response = await axios.post('http://localhost:3000/users.json', payload)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signup-container'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='form-signup'
      >
        <div>
          <label>Email:</label>
          <input name='email' type='email' required></input>
        </div>

        <div>
          <label>Password</label>
          <input></input>
        </div>

        <div>
          <label>Password Confirmation</label>
          <input></input>
        </div>
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}