import './Main.css';

export function Main() { 
  return ( 
    <div>
      <div className="container-main">
        <div className='container-first'>
          <h1>
            Hi
          </h1>
        </div>
          <div className='img-container-1'>
          <img className="london" src="/F294F716-3138-4B66-9BB7-B8AEA3BFCD2E_1_105_c.jpeg" alt="image-london" />
          </div>
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
