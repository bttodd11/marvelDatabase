import React    from "react";
import  "./preload.css";
import preLogo from '../preload/img/loader.png'

class PreLoader extends React.Component {

    constructor(props) {
      super(props);
      };


  render() {
    return(
    <div className="searchBar">
    <div>
      <div>
        <button className="buttonLoad">
          {<img src={preLogo} className='preLogo' />}
          <br />
          <p className="preLoader">Searching Database</p>
        </button>
      </div>
    </div>
  </div>
  )
  }
}

export default PreLoader;
