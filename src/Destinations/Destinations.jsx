import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Destinations.css'

export function Destinations() { 
  const [destination, setDestination] = useState([])
  const navigate = useNavigate()
  const [imageIndexes, setImageIndexes] = useState({})


  const handleIndex = async () => { 
    try { 
     const response = await axios.get('http://localhost:3000/destinations.json');
      setDestination(response.data)
    }catch (error) { 
      console.error('Error fetching data', error)
    }
  }

  const handlePrevImage = (id) => { 
    setImageIndexes(prev => ({ 
      ...prev, 
      [id]: Math.max((prev[id] || 0) -1, 0)
    }))
  }

  const handleNextImage = (id, totalImages) => { 
    setImageIndexes(prev => ({ 
      ...prev, 
      [id]: Math.min((prev[id] || 0) + 1, totalImages -1)
    }))
  }

  useEffect(() => { 
    handleIndex();
  }, [])

  const handleShow = (d) => { 
    navigate(`/destinations/${d.id}`)
  }
  
  const handleCreate = () => { 
    navigate('/CreateNewDestination')
  }


  return ( 
    <div className='container-all'>
      {destination.map((d) => (
        <div className='information-d' key={d.id}>
          <h1>
            {d.city}, {d.country}
          </h1>
          {d.images && d.images.length > 0 ? (
            <div className='image-carousel-wrapper'>
              <button 
                className='arrow-button left'
                onClick={() => handlePrevImage(d.id)}
                disabled={(imageIndexes[d.id] || 0) === 0}
              >
                &#8592;
              </button>

            <div className='image-carousel-single'>
              <img 
                className='carousel-image' 
                key={d.images[imageIndexes[d.id] || 0].id} 
                src={d.images[imageIndexes[d.id] || 0].image_url} 
                alt={`image of ${d.city}`} 
              />
            </div>

            <button 
              className="arrow-button right"
              onClick={() => handleNextImage(d.id, d.images.length)}
              disabled={(imageIndexes[d.id] || 0) === d.images.length - 1}
            >
              &#8594;
            </button>
          </div>
        ) : (
          <p>No Images available</p>
        )}
      <div className='button-container-1'>
        <button 
          className='moreInfo-button'  
          onClick={() => {handleShow(d)}}>
          More Information
        </button>
      </div>
      </div>
      ))}
      <div className='button-container-3'>
      <button
        className='new-post-button'
        onClick={handleCreate}>
        Create New Post
      </button>
      </div>
    </div>
  )
}