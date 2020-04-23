import React from "react";
import notFoundImage from './img/notFound.png'
import './notfound.css';

class NotFound extends React.Component {

  constructor(props) {
    super(props);

    };


  render() {
    return (
      <div className="searchBar">
        <div>
          <div>
            <button className="buttonLoad">
            <img src={notFoundImage} className="notFoundImage" alt="Logo" />
              <p className="preLoader"> "Character  Not Found" </p>
            </button>
          </div>
        </div>
      </div>
        )
  }
}
export default NotFound;
