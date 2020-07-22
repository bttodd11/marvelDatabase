import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './comics.css';
import PreComicLoader from '../preComicLoader/preComicLoader.js'
import moment from 'moment';


const Comics = (comics) => {
  // Setting initial hook values.
  const [foundComics, setComics] = useState([]);
  const [comicisLoaded, setComicsLoaded] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [displayComics, setComicsDisplay] = useState(true);

  const API = 'https://gateway.marvel.com/v1/public/characters/';
  const charId = comics.comics;
  const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
  const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
  const date = '1&';
  const comicUrl = API + charId + '/comics?' + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash;


  const fetchComicData = (comicUrl) => {
    let selectedComics = [];
    fetch(comicUrl)
      .then(res => res.json())
      .then(result => {
        for (let index = 0; index < 9; index++) {
          let comicIndex = randomIndex(result.data.results.length)
          result.data.results[comicIndex].modified = dateModifier(result.data.results[comicIndex].modified)
          if (result.data.results[comicIndex].description ==  "" || result.data.results[comicIndex].description == null) {
            result.data.results[comicIndex].description = "Description for this comic is not available";
          }
          selectedComics.push(result.data.results[comicIndex])
          console.log(selectedComics)

        }
        setComics(selectedComics)
        setComicsLoaded(false);
        setComicsDisplay(false);
      })
      .catch(error =>
        console.log(error)
      )
  }

  const randomIndex = (length) => {
    return Math.floor(Math.random() * length)
  }
  const dateModifier = (date) => {
let newDate = moment.utc(date).local();
return ("date", newDate.format('MM/DD/YYYY'));
  }


  useEffect(() => {
    if (foundComics.length <= 0 && initialRender) {
      console.log("render")
      fetchComicData(comicUrl);
      setInitialRender(false);
      console.log(foundComics)
    }
  }, [foundComics])



  return (
    <div>
      {comicisLoaded ? <PreComicLoader /> : null}
     {displayComics ? null : <Container className="comicBorder">
        <Row>
          {foundComics.map(com =>
            (
              <Col md="4">
                <div id="container">
                  <div id="cardContainer">
                    <div className="front face">
                      <p className="comicsDetail">{com.title}</p>
                      <img src={com.thumbnail.path + "/portrait_fantastic.jpg"} className="comicImageBorder" />
                    </div>
                    <div className="back face center">
                    <p className="comicsDetail cardComicsDetail">{com.title}</p>
                    <p className="comicsDetail comicsDate"> Print Date - {com.modified}</p>
                    <p className="cardComicsDescription">{com.description}</p>
                     </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>}
    </div>
  )
}

export default Comics;
