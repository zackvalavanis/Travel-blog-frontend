import { useLoaderData } from "react-router-dom"
import axios from 'axios'
import { Modal } from "./Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './DestinationsShow.css'

export function DestinationsShow() 
{ 
  const destinations = useLoaderData()
  const [modalShow, isModalShow] = useState(false)
  const navigate = useNavigate()
  const [imageIndexes, setImageIndexes] = useState({})

  const handleDelete = async (id) => { 
    try { 
      const response = await axios.delete(`http://localhost:3000/destinations/${id}.json`)
      console.log('success:', response.data)
    } catch (error) { 
      console.log(error)
    }
    navigate('/destinations')
  }

  const handleModalShow = () => { 
    isModalShow(true)
  }

  const handleModalHide = () => { 
    isModalShow(false)
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

  const images = destinations?.images || [];
  const currentIndex = imageIndexes?.[destinations.id]  ?? 0;
  const currentImage = images[currentIndex];

  const handleUploadImages = async (event) => { 
    event.preventDefault()
    const params = new FormData(event.target)
    try{ 
      const response = await axios.patch('http://localhost:3000/images.json', params)
      console.log(response.data)
    } catch (error){ 
      console.log(error)
    }
  }
  
  return (
    <div>
      <h1 className='place-name'>
        {destinations.city}, {destinations.country}
      </h1>
  
      {images.length > 0 && images[0] ? (
        <img
          className='images-show'
          src={images[0].image_url}
          alt={`Image of ${destinations.city}`}
        />
      ) : (
        <p>There are no images</p>
      )}
      <button onClick={() => {handleUploadImages(destinations.id)}}>Add Image</button>
      <h1 style={{display:'flex', justifyContent: 'center'}}>What is {destinations.city}</h1>
      <p className='description'>{destinations.description}</p>
      <div style={{display:'flex', flexDirection:'row', gap: '25%', justifyContent: 'center', padding: '5%'}}>
        <div>
          <h1>Restaurants & Bars</h1>
            <p>There were many terrific restaurants and bars in {destinations.city} and here are a couple of my favorites.</p>
        </div>
        <div>
          <h1>Touristy Spots</h1>
        </div>
      </div>

      <h1 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>More Images Below</h1>
      {images.length > 0 && currentImage ? (
        <div className='image-carousel-wrapper'>
          <button
            className='arrow-button left'
            onClick={() => handlePrevImage(destinations.id)}
            disabled={currentIndex === 0}
          >
            &#8592;
          </button>
  
          <div className='image-carousel-single'>
            <img
              className='carousel-image'
              key={currentImage.id}
              src={currentImage.image_url}
              alt={`Image of ${destinations.city}`}
            />
          </div>
  
          <button
            className='arrow-button right'
            onClick={() =>
              handleNextImage(destinations.id, images.length)
            }
            disabled={currentIndex === images.length - 1}
          >
            &#8594;
          </button>
        </div>
      ) : (
        <p>No Images available</p>
      )}
  
      <div className='button-container'>
        <button
          onClick={handleModalShow}
          className='button-delete'
        >
          Delete
        </button>
      </div>
  
      <Modal
        show={modalShow}
        onClose={handleModalHide}
        handleDelete={() => handleDelete(destinations.id)}
      />
    </div>
  )
} 