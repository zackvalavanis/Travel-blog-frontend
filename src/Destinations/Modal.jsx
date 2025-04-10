import './Modal.css'

export function Modal({show, onClose, handleDelete}) { 
  if(!show) return null;
  return ( 
  <div className='modal-container'>
  <h1 className='textModal'>
    Are you sure you want to delete this? 
  </h1>
  <button onClick={() => handleDelete()}>Delete</button>
  <button onClick={onClose}>Hide</button>
  </div>
  )
}