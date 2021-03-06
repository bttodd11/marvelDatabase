import React    from "react";
import  "./preload.css";
import preLogo from '../preload/img/loader.png'

const PreLoader = () => {

    return(
    <div className="searchBar">
    <div>
      <div>
        <a className="buttonLoad">
          {<img src={preLogo} className='preLogo' />}
          <br />
          <p className="preLoader">Searching Database</p>
        </a>
      </div>
    </div>
  </div>
  )
  }


export default PreLoader;
