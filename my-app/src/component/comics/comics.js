import React    from "react";
import { Container, Row, Col } from 'react-bootstrap';
import template from "./comics.jsx";
import Search from '../search/Search.js';

class comics extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        comics: [],
      }
    }
  
  render() {
     const { comics } = this.state;

    return(
    <div className="">
    <Container>
    <Row>
      {comics.map(item =>
        (<Col md="12">
          <p className="">{item.name} </p>
        </Col>))}
        </Row>
  </Container>
  </div>
    )
  }
}

export default comics;
