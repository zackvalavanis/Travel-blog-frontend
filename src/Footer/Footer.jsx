import './Footer.css'
import { Link } from 'react-router-dom'

export function Footer() { 
  return (
    <div className='footer-container'>
      <h1 className='footer-words'>Footer</h1>
      <Link to='/destinations'>Destinations</Link>
    </div>
  )
}