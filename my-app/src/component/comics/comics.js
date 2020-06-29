import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './comics.css';
import PreComicLoader from '../preComicLoader/preComicLoader.js'


const Comics = (comics) => {
  // Setting initial hook values.
  const [foundComics , setComics ] = useState([]);
  const [comicisLoaded, setComicsLoaded ] = useState(true);
  const [initialRender, setInitialRender ] = useState(true)

  // const API = 'https://gateway.marvel.com/v1/public/characters/';
  const charId = comics.comics;
  const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
  const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
  const date = '1&';
  const comicUrl = charId + '/comics?' +  'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash;


  const fetchComicData = (comicUrl) => {
    fetch(comicUrl)
    .then(res => res.json())
    .then(result => 
        setComics(result.data.results)
    )
    .catch(error => 
     console.log(error)
     )
  }


useEffect (() =>{
  fetchComicData(comicUrl);
  if(foundComics.length > 0 && initialRender){
    setComicsLoaded(false);
    setInitialRender(false)
    console.log("Times of render")
    console.log(foundComics)
  }
},[foundComics])



    return (
      <div>
        {comicisLoaded ? <PreComicLoader /> : null}
        <Container>
          <Row>
        {foundComics.map(com =>
        (<Col md="3" className="foundComicsMap">
          <p className="comicsDetail">{com.title}</p>
         <img src={com.thumbnail.path + "/portrait_xlarge.jpg"}  className="comicImageBorder" />
        </Col>))}
          </Row>
        </Container>
      </div>
    )
   }
  
export default Comics;
