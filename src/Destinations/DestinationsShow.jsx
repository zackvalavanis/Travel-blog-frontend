import { useLoaderData } from "react-router-dom"
import axios from 'axios'
import { Modal } from "./Modal"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import './DestinationsShow.css'
import { Modal2 } from "./Modal2"
import { Modal3 } from "./Modal3"

export function DestinationsShow() { 
  const destinations = useLoaderData()
  const [modalShow, isModalShow] = useState(false)
  const navigate = useNavigate()
  const [modalShow2, isModalShow2] = useState(false)
  const [modalShow3, isModalShow3] = useState(false);
  const [description, setDescription] = useState(destinations.description || "");
  const [city, setCity] = useState(destinations.city || "");
  const [country, setCountry] = useState(destinations.country || "");
  const [isEditing, setIsEditing] = useState(false)


  const handleSave = () => { 
    handleUpdateName({preventDefault: () => {}}, destinations.id, city, country)
    setIsEditing(false)
  }
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


  const navToSeeAllImages = () => { 
    console.log("Navigating with images:", images, destinations);
    navigate('/Images', { state: { images, destinations } 
    });
      console.log('this is your array', images, destinations)
  }

  const handleUpdateName = async (e, id, city, country) => { 
    e.preventDefault()
    try { 
      const params = { 
        destination: { 
          city, 
          country
        },
      }
      const response = await axios.patch(`http://localhost:3000/destinations/${id}.json`, params)
      console.log(response.data)
      setCity(response.data.destination.city || "")
      setCountry(response.data.destination.country || "")
    } catch (error) { 
      console.log(error)
    }
  }



  useEffect(() => {
    setDescription(destinations.description || "");
    setCity(destinations.city || "");
    setCountry(destinations.country || "");
  }, [destinations]);


  return (
    <div className='container-all-2'>
      {isEditing ? (
        <div className='placeName-inputs-container'>
          <div className='placeName-inputs'>
          <input 
            className='input-field-1'
            name='city' 
            value={city}
            onChange={(e) => setCity(e.target.value)}>
          </input>
          <input 
            className='input-field-1'
            name='country' 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
          </input>
        </div>
        <div className='button-container-2'>
          <button 
            className='input-field-2'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='input-field-2' 
            onClick={() => { 
            setIsEditing(false)
            setCity(destinations.city)
            setCountry(destinations.country)
            }}
            >
            Cancel
          </button>
        </div>
      </div>
      ) : (
        <div className='place-name-container'>
        <h1 
          className='place-name'
          onClick={() => setIsEditing(true)}
          style={{cursor: 'pointer'}}
        >
          {city}, {country}
        </h1>
      </div>
        )}
      {images.length > 0 && images[0] ? (
          <img
            className='images-show'
            src={images[0].image_url}
            alt={`Image of ${destinations.city}`}
            onClick={navToSeeAllImages}
          />
      ) : (
        <p>There are no images</p>
      )}
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