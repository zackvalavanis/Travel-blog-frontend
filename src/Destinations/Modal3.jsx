import axios from 'axios'
import './Modal.css'
import './Modal3.css'


export function Modal3({ show, onClose, destinations, description, setDescription }) {
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:3000/destinations/${destinations.id}.json`, {
        description,
      });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!show) return null;

  return (
    <div className='modal-overlay-3'>
    <div className="modal-container3">
      <h2 
        className='header-modal3'
      >
        Edit Description
      </h2>
      <textarea 
        className='text-area3'
        value={description} 
        onChange={handleChange} 
      />
      <div className='button-containers-3'>
        <button 
          className='button1-modal3'
          onClick={handleSubmit}
        >
          Save
        </button>
        <button 
          className='button2-modal3'
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      </div>
    </div>
  );
}
