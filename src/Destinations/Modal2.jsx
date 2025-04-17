import './Modal.css'
import { useState } from 'react';

export function Modal2({show, onClose, imageCreate, destinations}) { 
  const [imageUrls, setImageUrls] = useState([''])

  const handleImageUrlChange = (index, value) => { 
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls)
  } 
  
  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const subtractImageUrlField = () => { 
    setImageUrls(prev => prev.slice(0,-1))
  }



  const handleUploadImages = async (event) => { 
    event.preventDefault()
    const params = new FormData(event.target)
    try{ 
      const response = await axios.post('http://localhost:3000/images.json', params)
      console.log(response.data)
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
        Soup
      </h1>
      <form onSubmit={handleUploadImages}>
        <label className='image-add-label'>
          <input 
            type='hidden'
            name='destination_id'
            className='image-add-input' 
            defaultValue={destinations.id}>
          </input>
          Destination ID: {destinations.id}
        </label>
        <label>
          <input 
            name='image_url'
            className='image-add-input' 
            placeholder="Enter URL"
            >
          </input>
          Image_URL: 
        </label>
        {imageUrls.map((url, index) => (
          <label key={index}>
            Image URL {index + 1}
            <input  
              type='text'
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              required
            />
          </label>
          ))}
          <button onClick={addImageUrlField}>Add Another Image</button>
          <button onClick={subtractImageUrlField}>Remove</button>
      <button type='submit'>Add Image</button>
      </form>
      <div className='button-container-2'>
        <button 
          className='button-delete-2'
          onClick={() => imageCreate()}>
          Add Images
        </button>
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