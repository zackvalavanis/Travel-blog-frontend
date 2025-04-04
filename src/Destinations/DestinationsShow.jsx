import { useLoaderData } from "react-router-dom"

export function DestinationsShow() { 
  const destinations = useLoaderData()

  console.log(destinations)

  return ( 
    <div>
      <h1>{destinations.city}, {destinations.country}</h1>
      <p>{destinations.description}</p>
      {destinations.images && destinations.images.length > 0 ? (
        <div>
          {destinations.images.map((image) => ( 
            <img key={image.id} src={image.image_url}/>
          ))}
        </div>
      ) : (
        <p>No Image Available</p>
      )}
    </div>
  );
}