import { useLoaderData } from "react-router-dom"
import axios from 'axios'
import { Modal } from "./Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './DestinationsShow.css'

export function DestinationsShow() { 
  const destinations = useLoaderData()
  const [modalShow, isModalShow] = useState(false)
  const navigate = useNavigate()

  console.log(destinations)


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

  return ( 
    <div>
      <h1 
        className='place-name'>
        {destinations.city}, {destinations.country}
      </h1>
      {destinations.images.length > 0 ? ( 
      <img 
        className='images-show' src={destinations.images[0].image_url}>
      </img> ) : (
        <p>There are no images</p>
      )}
      <p 
        className='description'>{destinations.description}
      </p>

      {destinations.images.length > 0 ? ( 
        destinations.images.map((image) => ( 
          <div key={image.id}>
            <img src={image.image_url}></img>
          </div>
        ))
      ) : (
        <p>The image doesnt exist</p>
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
        handleDelete={() => handleDelete(destinations.id)}>
      </Modal>
    </div>
  );
}