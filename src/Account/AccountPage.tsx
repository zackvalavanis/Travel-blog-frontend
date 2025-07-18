import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import './AccountPage.css';
import { UpdateProfileImage } from './UpdateProfileImage'
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsModal } from "./SettingsModal";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';


type Like = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  destination: {
    id: number;
    city: string;
    country: string;
    description: string;
    image: string[];
  }
}


export function AccountPage() {
  const [likedDestinations, setLikedDestinations] = useState<Like[]>([])
  const navigate = useNavigate()
  const { id: userId, loading } = useContext(UserContext);
  const [modalShowing, isModalShowing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [settingsModalShowing, isSettingsModalShowing] = useState(false)

  const fetchProfile = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`, { withCredentials: true });

      if (response.data.profile_image_url) {
        setProfileImage(response.data.profile_image_url);
        setBackgroundImage(response.data.background_image)
        localStorage.setItem('profileImage', response.data.profile_image_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };


  const handleLikes = async () => {

    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query: `{ 
          likes { 
            id
            user { 
              id
              name
            }
            destination { 
              id
              city
              country 
              description
              image
            }
          }
        }`,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const allLikes: Like[] = response.data.data.likes;
      const userLikes = allLikes.filter((like) => {
        return Number(like.user.id) === userId
      })

      setLikedDestinations(userLikes);
    } catch (error) {
      console.log("Error in handleLikes:", error);
    }
  };

  const handleNavigate = (like: Like) => {
    navigate(`/destinations/${like.destination.id}`)
  }

  const handleRemoveLike = async (like: Like) => {
    try {
      const response = await axios.delete(`http://localhost:3000/likes/${like.id}.json`)
      setLikedDestinations(prev => prev.filter((d) => d.id !== like.id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!loading && userId !== undefined) {
      handleLikes();
    }
  }, [userId, loading]);

  useEffect(() => {
    if (userId === undefined) {
      setLikedDestinations([]);
    }
  }, [userId]);

  const jwt = localStorage.getItem('jwt')

  const loggedIn = jwt

  const handleShowModal = () => {
    isModalShowing(true)
  }

  const handleModalHide = () => {
    isModalShowing(false)
  }

  const handleOpenSettingsModal = () => {
    isSettingsModalShowing(true)
  }

  const hideSettings = () => {
    isSettingsModalShowing(false)
  }

  useEffect(() => {
    if (!loading && userId !== undefined) {
      fetchProfile()
    }
  }, [userId, loading])

  // const profileImage = <img src={image}>''</img>

  return (
    <div className='entire-container'>
      <div className='profile-image'>
        <div className='profile-image-container-1'>
          <div className='background-wrapper'>
            <img
              src={backgroundImage || './stock-background.jpg'}
              className="profile-background"
            />
            <button
              className="settings-button"
              onClick={handleOpenSettingsModal}
            >
              <SettingsIcon className='settings-wheel' style={{ fontSize: "30px" }} />
            </button>
          </div>

          {profileImage && (
            <img
              className="profile-avatar"
              src={profileImage}
              alt="Profile"
              onClick={handleShowModal}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>


        <div className='container-likes'>
          {likedDestinations.map((like) => (
            <div className='likes' key={like.id}>
              <p style={{ textAlign: 'center', color: 'black', marginBottom: '0', marginTop: '30%' }}>{like.destination.city}</p>
              {
                like.destination.image && like.destination.image.map((image_url, index) => (
                  <div key={index}>
                    <button className='image-select' style={{ cursor: 'pointer', borderRadius: '20px', border: 'none' }} onClick={() => handleNavigate(like)}>
                      <img className="like-card__image" src={image_url} alt={`Image ${index + 1}`} />
                    </button>
                  </div>
                ))
              }
              <div className='button-container-account' style={{ position: 'relative' }}>
                <button className='button-delete-1' onClick={() => handleRemoveLike(like)}>
                  <ThumbDownAltIcon />
                </button>
                <span className='tooltip-text'>
                  This will remove the destination from your page.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalShowing && (
        <UpdateProfileImage
          show={modalShowing}
          onClose={handleModalHide}
          onProfileUpdated={fetchProfile}
        />
      )}

      {settingsModalShowing && (
        <SettingsModal show={settingsModalShowing} onClose={hideSettings} />
      )}
    </div>
  )
}    