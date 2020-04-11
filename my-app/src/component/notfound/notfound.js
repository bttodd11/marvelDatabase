import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="searchBar">
        <div>
          <div>
            <button className="buttonLoad">
              <p className="preLoader">Character Search Not Found</p>
            </button>
          </div>
        </div>
      </div>
        )
  }
}

export default NotFound;
