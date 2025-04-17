import './Modal.css'
import './Modal2.css'
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
          <label className='image-url-name' key={index}>
            Image URL {index + 1}
            <input  
              className='image-url-input'
              type='text'
              name='image_url'
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              required
            />
          </label>
          ))}
        <div className='button-containers-end'>
          <button 
            className='button-look'
            type='button' 
            onClick={addImageUrlField}>Add Another Image
          </button>
          <button 
            className='button-look2'
            type='button' 
            onClick={subtractImageUrlField}>Remove
          </button>
          <button 
            className='button-look3'
            type='submit'>
            Add Image
          </button>
        </div>
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