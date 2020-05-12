import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import template from "./comics.jsx";
import Search from '../search/Search.js';


class comics extends React.Component {
  constructor(props) {
    super(props);
    this.updateComics = this.updateComics.bind(this);
  }


  updateComics = (id) => {
    const API = 'https://gateway.marvel.com/v1/public/characters/';
    const charId = this.props.charId;
    const key = 'tempKey&';
    const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
    const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
    const date = '1&';
    let url = API + charId + key + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash;
  }



  render() {

    const comics = this.props.comics;

  

    return (
      <div className="">
        <Container>
          <Row>
            {comics[0].map(item =>
              (<Col md="4">
                <p className="">{item.name} </p>
              </Col>))}
          </Row>
        </Container>
      </div>
    )
  }
}



export default comics;
