import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import './AccountPage.css';
import { UpdateProfileImage } from './UpdateProfileImage'


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
      console.log(response)
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
      setLikedDestinations([]);  // clear the list when there is no user
    }
  }, [userId]);

  const storedImage = localStorage.getItem('profileImage');
  const profileImage = storedImage && storedImage !== 'null' && storedImage !== '' ? storedImage : null;
  const jwt = localStorage.getItem('jwt')

  const loggedIn = jwt

  const handleUpdateProfileImage = () => {
    isModalShowing(true)
  }

  const handleModalHide = () => {
    isModalShowing(false)
  }

  // const profileImage = <img src={image}>''</img>

  return (
    <div className='entire-container'>
      <div className='profile-image'>
        <div className='profile-image-container-1'>
          <img
            src='https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?cs=srgb&dl=pexels-pixabay-259280.jpg&fm=jpg'
            className="profile-background"
          />
          {profileImage ? (
            <button onClick={
              handleUpdateProfileImage
            }>
              <img className="profile-avatar" src={profileImage} alt='Profile' />
            </button>
          ) : (
            <button onClick={(handleUpdateProfileImage)}>
              <img className="profile-avatar" src="/ProfileImage.png" alt="Profile" />
            </button>
          )}
        </div>

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
            <div className='button-container-account'>
              <button className='button-delete-1' onClick={() => handleRemoveLike(like)}>Unlike</button>
            </div>
          </div>
        ))}
      </div>
      {modalShowing && (
        <UpdateProfileImage
          show={modalShowing}
          onClose={handleModalHide}
        />
      )}
    </div>
  )
}    