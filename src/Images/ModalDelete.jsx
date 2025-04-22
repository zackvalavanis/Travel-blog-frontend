import './ModalDelete.css'

export function ModalDelete({show, onClose, imageId, onDelete}) { 
  console.log(imageId)

  if(!show) return null

  const handleDeleteClick = () => { 
    onDelete(imageId)
    onClose()
  }

  return ( 
  <div className='modal-delete-show'>
    <h1
      className='header-delete-modal'
      style={{color: 'black'}}
    >
      Are You sure You want to Delete this Image?
    </h1>
    <button
      onClick={handleDeleteClick}
    > Delete Image
    </button>
    <button
      onClick={onClose}
    >
      Close
    </button>
  </div>
  )

}