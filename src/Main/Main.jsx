import './Main.css';

export function Main() { 
  return ( 
    <div>
      <div className="container-main">
        <div className='container-first'>
          <h1>hi</h1>
        </div>

        <div className='img-container-1'>
          <img className="japan" src="/F294F716-3138-4B66-9BB7-B8AEA3BFCD2E_1_105_c.jpeg" alt="image-Japan" />
        </div>
      </div>

      <div className="container-2">
        <div className='lefthalf-1'>
          <h1>
            The Netherlands. A magical place. 
          </h1>
        </div>
        <div className='righthalf-1'>
          <img className='image-1' src="public/GettyImages-1237570768.avif" alt="image-japan" />
        </div>
      </div>

      <div className="container-3">
        <div className='lefthalf-2'>
          <img className='image-2' src="public/GettyImages-1237570768.avif" alt="image-japan" />
        </div>
        <div className='righthalf-2'>
          <h1>
            The Netherlands. A magical place. 
          </h1>
        </div>
      </div>

      <div>
        <img src='/oops.png' alt='image-greece'/>
      </div>
    </div>
  );
}
