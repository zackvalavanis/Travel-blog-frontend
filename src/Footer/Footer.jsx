import './Footer.css'
import { Link } from 'react-router-dom'
import { Logout } from '../Logout/LogoutLink.tsx'

export function Footer() { 

  const jwt = localStorage.getItem('jwt')
  const loggedIn = Boolean(localStorage.getItem('jwt'));

  return (
    <div className='footer-container'>
      <div className='footer-div-1'>
        <div className='footer-header'>
          <h1 className='footer-words'>Footer</h1>
        </div>

        <div className='link-container'>
          {loggedIn ? (
            <>
            <Link to='/destinations'>Destinations</Link>
            <Link to='/New Post'>New Post</Link>
            </>
          ) : (
            <>
            <Link to='/Login'>Login</Link>
            <Link to='/Signup'>Signup</Link>
            {jwt && jwt.length > 0 ? <Logout/> : ''}
            </>
          )}
        </div>
      </div>
    </div>
  )
}