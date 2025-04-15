import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreateNewDestination.css'

export function CreateNewDestination() { 
  const navigate = useNavigate()
  
  const handleCreate = async (event) => { 
    event.preventDefault()
    const params = new FormData(event.target)
    try { 
      const response = await axios.post('http://localhost:3000/destinations.json', params)
      console.log(response.data)
    } catch(error) { 
      console.log(error)
    }
    navigate('/destinations')

  }


  return ( 
  <div className='form-wrapper'>
    <h1>New Destination</h1>
    <form 
      onSubmit={handleCreate}
      className='form-create'
    >
      <label>City:
        <input 
          className='city-input'
          type='text'
          placeholder='city'
          name='city'  
          required>
        </input>
      </label>
      <label>Country:
        <input 
          className='country-input'
          type='text'
          placeholder='country'
          name='country' 
          required>
        </input>
      </label>
      <label>Description:
        <textarea 
          className='description-input'
          type='text'
          placeholder='Description'
          name='description' 
          required>
        </textarea>
      </label>
      <button type='submit'> Create</button>
    </form>
  </div>
  )
}