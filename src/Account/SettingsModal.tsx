import React from "react";
import './SettingsModal.css'
import axios from "axios";
import { useState, useEffect } from "react";

type SettingsModalProps = {
  show: boolean,
  onClose: () => void
}

export function SettingsModal({ show, onClose }: SettingsModalProps) {
  const userId = localStorage.getItem('userId')
  const [file, setFile] = useState<File | null>(null)



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select an Image file.')

    const formData = new FormData()
    formData.append('background_image', file);

    try {
      const response = await axios.patch(`http://localhost:3000/users/${userId}.json`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      console.log("upload Successful", response.data);
    } catch (error) {
      console.error('Upload Failed', error)
    }
  }


  console.log('this is the userId', userId)
  if (!show) return null

  return (
    <div className='settings-modal-overlay'>
      <div className='settings-modal-container' onClick={(e) => e.stopPropagation()}>
        Hello
        <input
          id='background-upload'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <div>
          <p>Selected ${file.name}</p>
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>

  )
}