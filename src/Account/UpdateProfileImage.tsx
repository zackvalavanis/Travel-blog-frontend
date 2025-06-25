import React from "react";
import './updateProfiIeImage.css'

type UpdateProfileImageProps = {
  show: boolean;
  onClose: () => void
}

export function UpdateProfileImage({ show, onClose }: UpdateProfileImageProps) {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <h1>Hello</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}