import React from "react";
import './Title.css';
import logo from './img/humanTorch.svg'

class Title extends React.Component {
  render() {
    return (
      <div>
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
      <img src={logo} width="1" height="45" className="d-inline-block align-left" alt=""/> Marvel Database
       
     </a>
     <a className="navInfo">“Just because something works, doesn’t mean it can’t be improved.”</a>
    </nav>
      </div>
    )
  }
}

export default Title;
