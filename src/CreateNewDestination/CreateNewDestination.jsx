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
          destination_id: destinationId,
          image_url: url,
        });
      }
    } catch(error) { 
      console.log(error)
    }
    navigate('/destinations')

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
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              required
            />
          </label>
        ))}
        <button type="button" onClick={addImageUrlField}>
          Add Another Image
        </button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}