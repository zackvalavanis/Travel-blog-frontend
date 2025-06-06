import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


type LikedDestination = {
  id: number,
  user_id: number,
  destination_id: number

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
      const response = await axios.get('http://localhost:3000/likes.json')
      setLikedDestinations(response.data)
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
      {likedDestinations.map((like) => (
        <div key={like.id}>
          <h1>{like.destination.city}</h1>
          {like.destination.images && like.destination.images.map((image) => (
            <div key={image.id}>
              <img src={image.image_url} style={{ height: '300px', width: '400px' }}></img>
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