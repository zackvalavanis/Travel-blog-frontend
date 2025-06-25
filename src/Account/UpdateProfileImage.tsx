import React, { useState, useEffect } from "react";
import './updateProfiIeImage.css';
import axios from "axios";

type UpdateProfileImageProps = {
  show: boolean;
  onClose: () => void;
  onProfileUpdated: () => void
};

export function UpdateProfileImage({ show, onClose, onProfileUpdated }: UpdateProfileImageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const userId = localStorage.getItem('userId');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdateProfilePhoto = async () => {
    if (!selectedFile || !userId) {
      console.log("No selected file or user not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", selectedFile, selectedFile.name);

    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile image updated!");
      onProfileUpdated();
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!show) return null;

  return (
    <div className='modal-container'>
      <div className='modal'>
        <h1 className='title-11212'>Update Profile Photo</h1>
        <div className='buttons-99'>
          <div className='buttons-100'>
            <input style={{ display: 'none' }} id="profile-upload" type="file" accept="image/*" onChange={handleFileChange} />
            <label style={{ border: 'none', borderRadius: '5px', marginBottom: '5px', cursor: 'pointer' }} htmlFor="profile-upload" className="custom-upload-button">
              Upload Image
            </label>
            <button className='button-update' onClick={handleUpdateProfilePhoto} disabled={!selectedFile}>
              Update Profile Photo
            </button>
          </div>
        </div>
        <button className='button-close' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
