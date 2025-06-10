import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


type LikedDestination = {
  id: number,
  city: string,
  user_id: number,
  destination_id: number,
  images: any,
  image: any

  destination: {
    id: number,
    name: string,
    city: string,
    country: string,
    description: string
    images: any
  }
}

export function AccountPage() {
  const [likedDestinations, setLikedDestinations] = useState<LikedDestination[]>([])
  const navigate = useNavigate()

  const handleLikes = async () => {
    try {
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `{ 
          destinations { 
            id
            city
            country 
            description
            image
          }
        }`
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      setLikedDestinations(response.data.data.destinations)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLikes()
  }, [])


  const handleNavigate = (like: LikedDestination) => {
    navigate(`/destinations/${like.destination.id}`)
    console.log(like)
  }

  const handleRemoveLike = async (like: LikedDestination) => {
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
      {likedDestinations.map((destination) => (
        <div key={destination.id}>
          <h1>{destination.city}</h1>
          {destination.images && destination.images.map((image_url, index) => (
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