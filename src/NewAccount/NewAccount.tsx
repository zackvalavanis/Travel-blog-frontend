import React from 'react'
import './NewAccount.css'

export function SignUp() {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Yo yo ')
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