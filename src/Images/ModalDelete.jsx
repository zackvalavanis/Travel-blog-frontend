import './ModalDelete.css'

export function ModalDelete({show, onClose, imageId, onDelete}) { 
  console.log(imageId)

  if(!show) return null

  const handleDeleteClick = () => { 
    onDelete(imageId)
    onClose()
  }

  return ( 
  <div className='modal-delete-overlay'>
    <div className='modal-delete-show'>
      <h1
        className='header-delete-modal'
        style={{color: 'black', fontSize: '20px', margin: '20px'}}
      >
        Are You sure You want to Delete this Image?
      </h1>
      <div className='delete-modal-buttons-container'>
        <button
          className='button-delete-1'
          onClick={handleDeleteClick}
        > 
          Delete Image
        </button>
        <button
          className='button-close-2'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )

}