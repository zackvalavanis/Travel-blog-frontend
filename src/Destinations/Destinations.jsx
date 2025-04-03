import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export function Destinations() { 
  const [destination, setDestination] = useState([])
  const navigate = useNavigate()


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

  const handleShow = (d) => { 
    console.log(d)
  }


  return ( 
    <div>
      {destination.map((d) => (
        <div key={d.id}>
          <h1>
            {d.country}
          </h1>
          <h1>{d.city}</h1>
          <p>{d.description}</p>
          <button onClick={() => { 
            handleShow(d)
          }} >More Information</button>
          {d.images && d.images.length > 0 ? (
            <div>
              {d.images.map((image) => (
                <img key={image.id} src={image.image_url} alt={`image of ${d.city}`} />
              ))}
            </div>
          ) : (
            <p>No Images available</p>
          )}
        </div>
      ))}
    </div>
  )
}