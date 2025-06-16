import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Destinations.css';
import { HereMap } from '../Map/Map.jsx';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.js';

type DestinationImage = {
  image_url: string
}

type Destination = {
  id: number;
  city: string;
  images: DestinationImage[];
}

type Like = {
  id: number;
  destination_id: number;
  // add any other fields your API returns
};

type User = {
  id: number;
  likes: Like[];
  // other user fields if needed
};

export function Destinations() {
  const [destination, setDestination] = useState<Destination[]>([])
  const navigate = useNavigate();
  const { id: user_id } = useContext(UserContext);
  const [likes, setLikes] = useState<any[]>([]);

  const fetchLikes = async () => {
    if (!user_id) return;
    try {
      const response = await axios.get(`http://localhost:3000/users/${user_id}.json`);
      setLikes(response.data.destinations || []);
    } catch (error) {
      console.error('Error fetching likes', error);
    }
  };

  const handleIndex = async () => {
    try {
      const response = await axios.get('http://localhost:3000/destinations.json');
      setDestination(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    handleIndex();
    fetchLikes();
  }, [user_id]);


  const handleShow = (d: Destination) => {
    navigate(`/destinations/${d.id}`);
  };

  const handleCreate = () => {
    navigate('/New Post');
  };

  const handleLike = async (d: Destination) => {
    if (!user_id) {
      console.error('User or user ID not found');
      return;
    }
    console.log("likes is", likes);
    console.log("type of likes", typeof likes);


    const alreadyLiked = likes.some(like => like.id === d.id);

    if (alreadyLiked) {
      alert('You have already liked this destination.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/likes.json', {
        user_id,
        destination_id: d.id
      })
      console.log('Like Posted')
      alert('Liked Post')
      await fetchLikes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container-all'>
      <div className='header-container-8'>
        <h1 className='header-destinations'>My Travels</h1>
        <div className='image-container'>
          <img
            className='image-header-2'
            src='/FDD87365-651A-4492-A41F-D0D0A701A372.jpeg'
            alt='header'
            rel="noopener noreferrer"
          />
          <img
            className='image-header-2'
            src='/80C487E2-9948-426A-BE36-FE4506A265C0_1_105_c.jpeg'
            alt='header'
            rel="noopener noreferrer"
          />
        </div>
      </div>

      <div className='container-4'>
        {destination.length === 0 ? (
          <div className='button-container10'>
            <button className='button-post' onClick={handleCreate}>New Post</button>
          </div>
        ) : null}
        {destination.sort((a, b) => a.city.localeCompare(b.city)).map((d) => (
          <div className='information-d' key={d.id}>
            <h1 className='headers-5'>
              {d.city}
            </h1>
            {d.images && d.images.length > 0 ? (
              <div className='single-image-wrapper'>
                <img
                  className='carousel-image'
                  src={d.images[0].image_url}
                  alt={`image of ${d.city}`}
                />
              </div>
            ) : (
              <button>Button</button>
            )}
            <div className='button-container-1'>
              <button
                className='moreInfo-button'
                onClick={() => {
                  handleShow(d)
                }}>
                More Information
              </button>
            </div>
            <div className='like-button-container'>
              <button
                className='like-button-button'
                onClick={() => handleLike(d)}
              // disabled={likes.some(like => like.user_id === user_id && like.destination_id === d.id)}
              >
                Like
                {/* {likes.some(like => like.user_id === user_id && like.destination_id === d.id) ? 'Liked' : 'Like'} */}
              </button>
            </div>
          </div>
        ))}

        <div className='button-container-3'></div>
      </div>
      <div className='middle-container'>
        <div className='middle-container-2'>
          <div className='container-h1'>
            <h1>
              This is the middle container where I will put a big map showing all of the places I have been to.
            </h1>
          </div>
          <div className='map-container'>
            <div className='map'>
              <HereMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
