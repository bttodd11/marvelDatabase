import React from "react";
import notFoundImage from './img/notFound.png'
import './notfound.css';

const NotFound = () => {

    return (
      <div className="searchBar">
        <div>
          <div>
            <a className="buttonLoad">
            <img src={notFoundImage} className="notFoundImage" alt="Logo" />
              <p className="notFoundLoader"> Character  Not Found </p>
            </a>
          </div>
        </div>
      </div>
        )
  }

export default NotFound;
