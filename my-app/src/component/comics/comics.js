import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './comics.css';
import PreComicLoader from '../preComicLoader/preComicLoader.js'


class comics extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      foundComic: [],
      comicsLoaded: null,
    }
    this.updateComics = this.updateComics.bind(this);

  }

componentDidMount(){
  this.setState({
    comicsLoaded: true,
  })
  this.updateComics()
}



updateComics(){
    const API = 'https://gateway.marvel.com/v1/public/characters/';
    const charId = this.props.comics;
    const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
    const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
    const date = '1&';
    const comicUrl = API + charId + '/comics?' +  'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash;
    
    fetch(comicUrl)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          foundComic: result.data.results,
          comicsLoaded : false,
        });
      },
      (error) => {
     console.log("Error in updateComic")
      }
    )
}
  render() {
    const { foundComic } = this.state;
    console.log(foundComic)
    return (
      <div>
        {this.state.comicsLoaded ? <PreComicLoader /> : null}
        <Container>
          <Row>
        {foundComic.map(com =>
        (<Col md="3" className="foundComicsMap">


          <p className="comicsDetail">{com.title}</p>
         <img src={com.thumbnail.path + "/portrait_xlarge.jpg"}  className="comicImageBorder" />
        </Col>))}
          </Row>
        </Container>
      </div>
    )
  }
}



export default comics;
