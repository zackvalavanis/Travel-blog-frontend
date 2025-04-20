import './ModalDelete.css'

export function ModalDelete({show, onClose}) { 

  if(!show) return null

  return ( 
  <div className='modal-delete-show'>
    <h1>
      Are You sure You want to Delete this Image?
    </h1>
    <button
      onClick={onClose}
    >
      Close
    </button>
  </div>
  )

}