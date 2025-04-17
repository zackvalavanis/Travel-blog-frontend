import './Modal.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export function Modal2({show, onClose, destinations}) { 
  const [imageUrls, setImageUrls] = useState([''])
  const navigate = useNavigate()

  const handleImageUrlChange = (index, value) => { 
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls)
  } 
  
  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const subtractImageUrlField = () => { 
    if(imageUrls.length === 1){ 
      return alert('Cant Remove Another')
    } else { 
      setImageUrls(prev => prev.slice(0,-1))
    }
  }



  const handleUploadImages = async (event) => { 
    event.preventDefault()
    const params = new FormData(event.target)
    try{ 
      const response = await axios.post('http://localhost:3000/images.json', params)
      console.log(response.data)
      navigate(`/destinations/${destinations.id}`);
      setImageUrls([''])
    } catch (error){ 
      console.log(error)
    }
  }


  if(!show) return null;
  return ( 
  <>
  <div className='modal-overlay'>
    <div className='modal-container'>
      <h1 className='textModal'>
        Add Images
      </h1>
      <form onSubmit={handleUploadImages}>
        <label className='image-add-label'>
          <input 
            type='hidden'
            name='destination_id'
            className='image-add-input' 
            defaultValue={destinations.id}>
          </input>
          {/* Destination ID: {destinations.id} */}
        </label>
        {imageUrls.map((url, index) => (
          <label key={index}>
            Image URL {index + 1}
            <input  
              type='text'
              name='image_url'
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              required
            />
          </label>
          ))}
          <button type='button' onClick={addImageUrlField}>Add Another Image</button>
          <button type='button' onClick={subtractImageUrlField}>Remove</button>
      <button type='submit'>Add Image</button>
      </form>
      <div className='button-container-2'>
        <button 
          className='button-hide'
          onClick={onClose}>
          Hide
        </button>
      </div>
    </div>
  </div>
  </>
  )
}