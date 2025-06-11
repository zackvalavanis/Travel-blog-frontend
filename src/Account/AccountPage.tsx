import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



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

  const handleLikes = async () => {
    try {
      const response = await axios.post('http://localhost:3000/graphql', {
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
        }`
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      setLikedDestinations(response.data.data.likes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLikes()
  }, [])

  const handleNavigate = (like: Like) => {
    console.log(like)
    navigate(`/destinations/${like.destination.id}`)
  }

  const handleRemoveLike = async (like: Like) => {
    console.log(like)
    try {
      const response = await axios.delete(`http://localhost:3000/likes/${like.id}.json`)
      setLikedDestinations(prev => prev.filter((d) => d.id !== like.id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {likedDestinations.map((like) => (
        <div key={like.id}>
          <h1>{like.destination.city}</h1>
          {like.destination.image && like.destination.image.map((image_url, index) => (
            <div key={index}>
              <img src={image_url} style={{ height: '300px', width: '400px' }}></img>
            </div>
          ))}
          <button onClick={() => handleNavigate(like)}>Expand Story</button>
          <button onClick={() => handleRemoveLike(like)}>Delete</button>
        </div>
      ))
      }
    </div >
  )
}