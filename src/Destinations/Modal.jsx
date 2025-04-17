import './Modal.css'

export function Modal({show, onClose, handleDelete}) { 
  if(!show) return null;
  return ( 
  <>
  <div className='modal-overlay'>
    <div className='modal-container'>
      <h1 className='textModal'>
        This will Delete the Entire Destination.. 
      </h1>
      <div className='button-container-2'>
        <button 
          className='button-delete-2'
          onClick={() => handleDelete()}>
          Delete
        </button>
        <button 
          className='button-hide-1'
          onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  </>
  )
}