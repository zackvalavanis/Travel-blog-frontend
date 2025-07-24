import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

type Like = {
  id: number;
  createdAt: string
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

export function Dashboard() {
  const { id: userId, loading } = useContext(UserContext);
  const [likes, setLikes] = useState<Like[]>([])


  const handleLikes = async () => {

    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query: `{ 
          likes { 
            id
            createdAt
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

      setLikes(userLikes);
    } catch (error) {
      console.log("Error in handleLikes:", error);
    }
  };


  useEffect(() => {
    if (!loading && userId !== undefined) {
      handleLikes();
    }
  }, [userId, loading]);

  return (
    <div>
      {likes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((like) => (
        <div key={like.destination.id}>
          <h1>{like.destination.city}</h1>
          <img style={{ height: '200px', width: '200px' }} src={like.destination.image[0]} />
        </div>
      ))}
    </div>
  )
}