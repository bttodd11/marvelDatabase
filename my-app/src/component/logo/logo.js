import React from "react";
import marvelLogo from './img/marvelLogo.png'
import './logo.css';

class Logo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <img src={marvelLogo} className="marvelLogo" alt="Logo" />
      
    )
  }
}

export default Logo;
