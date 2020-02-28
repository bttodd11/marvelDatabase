import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './Image.css';



const API = 'https://gateway.marvel.com/v1/public/characters?';
const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
const date = '1&';
const limit = '&limit=' + 100;
let offset = 0;
const offsetLimit = 10;
const notAva = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";





class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoaded: false,
      char: []
    };

    const getData = (offset) =>{
      console.log("worked")
    }

   
  }

  componentDidMount() {
    fetch(API + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset=' + offset)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            char: result.data.results,
          });
        }
    ,
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
     this.getData(this.offset)
}


  render() {
    const { error, isLoaded, char } = this.state;
    const filteredData = char.filter(char => char.thumbnail.path !== notAva );

    console.log(char)
    return (
        <Container>
        <Row>
          {filteredData.map(char => (<Col md="3"> 
          <p>{char.name}</p>
          <img src={char.thumbnail.path + "/standard_large.jpg"} />{"\n"}
          {/* <p>{char.description}</p> */}
          </Col>))}

        </Row>
        </Container>
    )
}
}

export default Image;
