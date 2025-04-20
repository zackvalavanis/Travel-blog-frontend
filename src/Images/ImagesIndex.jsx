import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './ImagesIndex.css';
import axios from 'axios'

export function ImagesIndex() {
  const location = useLocation();
  const images = location.state?.images || [];

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (imgUrl) => {
    setFullscreenImage(imgUrl);
  };

  const handleCloseModal = () => {
    setFullscreenImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    try { 
      await axios.delete(`http://localhost:3000/images/${imageId}.json`)
      const updatedImages = images.filter((img) => img.id !== imageId)
      location.state.imafes = updatedImages
      window.location.reload()
    } catch (err) { 
      console.error('Failed to delete image', err)
    }
  }

  return (
    <div>
      <h1
        className='header-images'
      >
        All Images
      </h1>
      <div className="image-grid">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div className="image-card" key={index}>
            <img
              src={img.image_url}
              alt={`Destination Image ${index + 1}`}
              className="thumbnail"
              onClick={() => handleImageClick(img.image_url)}
            />
            <button 
              className='delete-button'
              onClick={() => handleDeleteImage(img.id)} // <== wrap it in a function
            >
              Delete Image
            </button>
          </div>
        ))
        ) : (
        <p>No images available.</p>
        )}
      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <img className="modal-image" src={fullscreenImage} alt="Full view" />
        </div>
      )}
    </div>
    </div>
  );
}
