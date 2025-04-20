import { useLocation } from 'react-router-dom';



export function ImagesIndex({id}) { 
  const location = useLocation()
  const images = location.state?.images || []

  return ( 
    <div>
      <h1>All Images</h1>
      {images.length > 0 ? (
        images.map((img, index) => (
          <img 
            key={index}
            src={img.image_url}
            alt={`Destination Image ${index + 1}`}
            style={{ width: "300px", padding: "10px" }}
          />
        ))
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
}