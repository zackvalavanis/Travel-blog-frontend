import axios from 'axios';
import { useState, useEffect } from 'react'

export function Destinations() { 
  const [destination, setDestination] = useState([])


  const handleIndex = async () => { 
    try { 
     const response = await axios.get('http://localhost:3000/destinations.json');
      setDestination(response.data)
    }catch (error) { 
      console.error('Error fetching data', error)
    }
  }

  useEffect(() => { 
    handleIndex();
  }, [])




  return ( 
    <div>
      {destination.map((d) => (
        <div key={d.id}>
          <h1>
            {d.country}
          </h1>
          <h1>{d.city}</h1>
        </div>
      ))}

    </div>
  )
}