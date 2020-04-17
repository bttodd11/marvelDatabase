import React from "react";
import './notfound.css';

class NotFound extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   notfound = false,
    // }
    };


  render() {
    return (
      <div className="searchBar">
        <div>
          <div>
            <button className="buttonLoad">
              <p className="preLoader" Character Search Not Found />
              <p className="preLoader">Image Not Available</p> 
            </button>
          </div>
        </div>
      </div>
        )
  }
}
export default NotFound;
