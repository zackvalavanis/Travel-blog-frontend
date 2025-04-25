import './Main.css';

export function Main() { 
  return ( 
    <div>
      <div className="container-main">
        <div className="text-overlay">
          <h1>hello</h1>
        </div>
        <img className="london" src="/London Image.jpg" alt="image-london" />
      </div>
      <div className="container-japan">
        <img src="/premium_photo-1661878091370-4ccb8763756a.jpeg" alt="image-japan" />
      </div>
      <div className='container-n'>
        <img src='/GettyImages-1237570768.avif' alt='image-netherlands'/>
      </div>
      <div>
        <img src='/ZAK.avif' alt='image-greece'/>
      </div>
    </div>
  );
}
