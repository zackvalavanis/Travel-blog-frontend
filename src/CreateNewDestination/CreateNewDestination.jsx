import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
  <div>
    <h1>New Destination</h1>
    <form onSubmit={handleCreate}>
      <label>City:
        <input 
          type='text'
          placeholder='city'
          name='city'  
          required>
        </input>
      </label>
      <label>Country
        <input 
          type='text'
          placeholder='country'
          name='country' 
          required>
        </input>
      </label>
      <label>Descriptions
        <input 
          type='text'
          placeholder='description'
          name='description' 
          required>
        </input>
      </label>
      <button type='submit'> Create</button>
    </form>
  </div>
  )
}