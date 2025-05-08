import { useLoaderData } from "react-router-dom"
import axios from 'axios'
import { Modal } from "./Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './DestinationsShow.css'
import { Modal2 } from "./Modal2"
import { Modal3 } from "./Modal3"

export function DestinationsShow() { 
  const destinations = useLoaderData()
  const [modalShow, isModalShow] = useState(false)
  const navigate = useNavigate()
  const [modalShow2, isModalShow2] = useState(false)
  const [imageIndexes, setImageIndexes] = useState({})
  const [modalShow3, isModalShow3] = useState(false);
  const [description, setDescription] = useState(destinations.description || "");
  

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

  const handleModalShow2 = () => { 
    isModalShow2(true)
  }

  const handleModalShow3 = () => { 
    isModalShow3(true)
  }

  const handleModalHide = () => { 
    isModalShow(false)
  }

  const handleModalHide2 = () => { 
    isModalShow2(false)
  }
  const handleModalHide3 = () => { 
    isModalShow3(false)
  }


  const images = destinations?.images || [];
  const currentIndex = imageIndexes?.[destinations.id]  ?? 0;
  const currentImage = images[currentIndex];

  const navToSeeAllImages = () => { 
    console.log("Navigating with images:", images, destinations);
    navigate('/Images', { state: { images, destinations } 
    });
      console.log('this is your array', images, destinations)
  }


  return (
    <div className='container-all-2'>
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
      <div className='navigate-container'>
        <button
          className='navigate-images'
          onClick={navToSeeAllImages}
        >
          See all Images
        </button>
      </div>
{/* Adding pictures once your on the show page.*/}
      <Modal2
        show={modalShow2}
        onClose={handleModalHide2}
        destinations={destinations}
      >
      </Modal2>
      <div className='button-add-container'>
        <button 
            className='button-add-button'
            onClick={handleModalShow2}
          >Add Additional Images
        </button>
      </div>
      <h1 
        style={{display:'flex', justifyContent: 'center'}}
      >
        What is {destinations.city}
      </h1>
        <p className='description'>{description}</p>
{/* Add destination description */}
      <Modal3
      show={modalShow3}
      onClose={handleModalHide3}
      destinations={destinations}
      description={description}
      setDescription={setDescription}
      />

      <div className='button-add-container'>
      <button 
          className='button-add-button'
          onClick={handleModalShow3}
        >
          Edit Description
        </button>
      </div>

      <div 
        style={{display:'flex', flexDirection:'row', gap: '25%', justifyContent: 'center', padding: '5%'}}
      >
      </div>
      <div className='container-middle-2'>
        <h1>
          Middle Container
        </h1>
      </div>










      <div className='button-container'>
        <button
          onClick={handleModalShow}
          className='button-delete'
        >
          Delete Destination
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