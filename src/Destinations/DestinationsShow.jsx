import { useLoaderData } from "react-router-dom"
import axios from 'axios'
import { Modal } from "./Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DestinationsShow() { 
  const destinations = useLoaderData()
  const [modalShow, isModalShow] = useState(false)
  const navigate = useNavigate()


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
      <h1>{destinations.city}, {destinations.country}</h1>
      <p>{destinations.description}</p>
      {destinations.images && destinations.images.length > 0 ? (
        <div>
          {destinations.images.map((image) => ( 
            <img key={image.id} src={image.image_url}/>
          ))}
        </div>
      ) : (
        <p>No Image Available</p>
      )}
      <button onClick={handleModalShow}>Delete</button>
      <Modal 
        show={modalShow} 
        onClose={handleModalHide}
        handleDelete={() => handleDelete(destinations.id)}>
      </Modal>
    </div>
  );
}