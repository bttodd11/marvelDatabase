import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './Image.css';



const notAva = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";





class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoaded: false,
      loading: true,
      char: []
    };

    function getData(params) {
      console.log("worked")
  }
}

async componentDidMount() {
const API = 'https://gateway.marvel.com/v1/public/characters?';
const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
const date = '1&';
const limit = '&limit=' + 100;
const offsetLimit = 15;
let offset = 0;
const url = API + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset='
// const response = await fetch(url)
// const data = await response.json()
let char = [];

for (let index = 0; index < offsetLimit; index++) {
  const response = await fetch(url + index * 100)
  const data = await response.json()
  char = char.concat(data.data.results);
}

this.setState({
  isLoaded: true,
  char: char,
  loading: false,
})

console.log(char)
  
}

 
 

  



  render() {
    const { error, isLoaded, char } = this.state;
    const filteredData = char.filter(char => char.thumbnail.path !== notAva );

    console.log(char)
    return (
      <div>
        {this.state.loading || !this.state.char ? (
          <div>
            <button class="buttonLoad">
              <i class="fa fa-circle-o-notch fa-spin fa-5x"></i>
           </button>
          </div>
      ) : (
        <Container>
        <Row>
          {filteredData.map(char => 
          (<Col md="3"> 
          <p>{char.name}</p>
          { <img src={char.thumbnail.path + "/standard_large.jpg"} />}{"\n"}
          </Col>))}
        
        </Row>
        </Container>
      

      )}</div>
    )}}
          


export default Image;
