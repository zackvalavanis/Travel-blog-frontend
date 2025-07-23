import React from "react";
import './SettingsModal.css'
import axios from "axios";
import { useState, useEffect } from "react";

type SettingsModalProps = {
  show: boolean,
  onClose: () => void
  setBackgroundImage: (url: string) => void
}

export function SettingsModal({ show, onClose, setBackgroundImage }: SettingsModalProps) {
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
      setBackgroundImage(response.data.background_image)
    } catch (error) {
      console.error('Upload Failed', error)
    }
  }


  console.log('this is the userId', userId)
  if (!show) return null

  return (
    <div className='settings-modal-overlay'>
      <div className='settings-modal-container' onClick={(e) => e.stopPropagation()}>
        <div className='header-settings-modal'>
          <h1 style={{ textAlign: 'center' }}>Choose a Background Photo</h1>
        </div>
        <div className='input-settings'>
          <input
            id='background-upload'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="background-upload" className='input-field-button'>Select Background Image</label>
        </div>

        <div className='upload-image-container'>
          {file && (
            <div className='upload-buttons'>
              <p>Selected: {file.name}</p>
              <button
                onClick={handleUpload}
                className='upload-image-button'
              >Upload Image</button>
            </div>
          )}
          <div className='close-button'>
            <button
              onClick={onClose}
              className="close-button-button"
            >Close</button>
          </div>
        </div>
      </div>
    </div>

  )
}