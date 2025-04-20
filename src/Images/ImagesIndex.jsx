import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './ImagesIndex.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ModalDelete } from './ModalDelete';

export function ImagesIndex() {
  const location = useLocation();
  const [images, setImages] = useState(location.state?.images || []);
  const { id, city, country} = location.state?.destinations || {};// Access passed data from location.state
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)

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
      setImages(updatedImages)
    } catch (err) { 
      console.error('Failed to delete image', err)
    }
  }

  const handleModalHide = () => { 
    setModalShow(false)
  }

  const handleDeleteModalShow = () => { 
    setModalShow(true)
    console.log('you clicked it')
  }

  const navigateBack = () => { 
    navigate(`/destinations/${id}`)
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
            <div className='delete-button-container'>
            <button 
              className='delete-button'
              onClick={() => handleDeleteImage(img.id)} // <== wrap it in a function
            >
              Delete Image
            </button>
          </div>
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
    <div className='back-button-container'>
      <button
        className='navigate-back'
        onClick={navigateBack}
      >
        Back to {city}, {country}
      </button>
    <button
      onClick={handleDeleteModalShow}
    > Delete
    </button>
    <ModalDelete
      show={modalShow}
      onClose={handleModalHide}
    >
    </ModalDelete>
    </div>
    </div>
  );
}
