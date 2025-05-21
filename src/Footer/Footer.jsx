import './Footer.css'
import { Link } from 'react-router-dom'

export function Footer() { 

  return (
    <div className='footer-container'>
      <h1 className='footer-words'>Footer</h1>
      <div className='link-container'>
        <Link to='/destinations'>Destinations</Link>
        <Link to='/New Post'>New Post</Link>
        <Link to='/LoginPage'>Login</Link>
      </div>
    </div>
  )
}