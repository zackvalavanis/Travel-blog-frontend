import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import './CreateNewDestination.css'
import { useState } from 'react'

export function CreateNewDestination() { 
  const navigate = useNavigate()
  const [imageUrls, setImageUrls] = useState(['']);

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };
  
  const handleCreate = async (event) => { 
    event.preventDefault()
    const params = new FormData(event.target)
    try { 
      const response = await axios.post('http://localhost:3000/destinations.json', params)
      const destinationId = response.data.destinationid
      console.log(response.data)
      console.log(destinationId)

      for (const url of imageUrls) {
        await axios.post('http://localhost:3000/images.json', {
          image: { 
            destination_id: destinationId,
            image_url: url
          }
        });
      }
    } catch(error) { 
      console.log(error)
    }
    navigate('/destinations')

  }

  const handleRemoveImage = () => { 
    if(imageUrls.length === 1){ 
      alert('You cant remove another image!')
    } else { 
      setImageUrls(prev => prev.slice(0,-1) )
    }
  }


  return (
    <div className="form-wrapper">
      <h1>New Destination</h1>
      <form onSubmit={handleCreate} className="form-create">
        <label>
          City:
          <input className="city-input" type="text" placeholder="city" name="city" required />
        </label>
        <label>
          State: 
          <input className="city-input" type="text" placeholder="State if applicable" name="state"></input>
        </label>
        <label>
          Country:
          <input className="country-input" type="text" placeholder="country" name="country" required />
        </label>
        <label>
          Description:
          <textarea
            className="description-input"
            placeholder="Description"
            name="description"
            required
          ></textarea>
        </label>
        {imageUrls.map((url, index) => (
          <label key={index}>
            Image URL {index + 1}:
            <input
              className='image-url-input'
              type='text'
              name='image_url[]'
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              required
            />
          </label>
        ))}
        <div className='button-container-3'>
        <button 
          className='button-add-image' type="button" 
          onClick={addImageUrlField}>
          Add Another Image
        </button>
        <button
          className='button-remove-image'
          type='button'
          onClick={handleRemoveImage}
        > 
          Remove Image
        </button>
        <button 
          className='button-submit-1'
          type="submit">
          Create
        </button>
        </div>
      </form>
    </div>
  );
}