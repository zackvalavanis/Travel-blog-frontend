import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import './CreateNewDestination.css'
import { useContext, useState } from 'react'
import { UserContext } from "../context/UserContext";

export function CreateNewDestination() { 
  const navigate = useNavigate()
  const [imageUrls, setImageUrls] = useState(['']);
  const { id: userId } = useContext(UserContext);

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
      console.log('this is id: ', destinationId)

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
    <div className="form-wrapper-5">
      <div className='header-container-5'>
        <h1 className='heaeder-5'>New Destination</h1>
      </div>
      <form onSubmit={handleCreate} className="form-create">
        <label>
          <input className='user_id-input' type='hidden' name='user_id' defaultValue={userId} required/>
        </label>
        <label>
          <input className="city-input" type="text" placeholder="city" name="city" required />
        </label>
        <label>
          <input className="city-input" type="text" placeholder="State if applicable" name="state"></input>
        </label>
        <label>
          <input className="country-input" type="text" placeholder="country" name="country" required />
        </label>
        <label>
          <textarea
            className="description-input"
            placeholder="Description"
            name="description"
            required
          ></textarea>
        </label>
        {imageUrls.map((url, index) => (
          <div key={index}className='image-url-container'>
          <label className='imageUrl-header'key={index}>
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
          </div>
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