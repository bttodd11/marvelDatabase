import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Container, Row, Col } from 'react-bootstrap';
import './Search.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import NotFound from '../notfound/notfound.js';
import PreLoader from '../preload/preload.js';
import Logo from '../logo/logo.js'
import Comics from '../comics/comics.js';
import MarvelPng from '../search/img/marvel.png'




const Search = () => {

  const [basicAddon1, setBasicAddon1] = useState(null);
  const [setUrl] = useState(null);
  const [data, setData] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [comics, setComics] = useState([]);
  const [foundSearch, setFoundSearch] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [notFound, setNotFound] = useState(false);
  let [logo, setLogo] = useState(true);

  const API = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=';
  const key = 'tempKey&';
  const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
  const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
  const date = '1&';
  const limit = '&limit=' + 100;
  let url = API + key + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset=';


  const fetchData = async (url, index) => {
    await fetch(url + index * 100)
      .then(response => response.json())
      .then(result => 
          setData({result})
          )
        }


  const searchChar = async () => {
    // Removing the logo and setting the preLoader 

    setLoaded(true);
    setLogo(true)
    setNotFound(false)
   

    var dataFetchPromises = [];
    let value = basicAddon1.toLowerCase();
    const searchIndex = value.substr(0, 4)
    let searchUrl = url.replace("tempKey", searchIndex);

  
 
    dataFetchPromises.push(fetchData(searchUrl, 0));
    await Promise.all(dataFetchPromises)

    console.log(dataFetchPromises)


  
      console.log(data)
    // for (let charName = 0; charName < data[0].data.results.length; charName++) {
    //   if (data[0].data.results[charName].name.toLowerCase().replace(/[\W]/g, "") == value.replace(/[\W]/g, "")) {

    //     foundSearch.push(data[0].data.results[charName]);
    //     setFoundSearch(foundSearch);
    //     setLoaded(false);
    //     setComics(comics);
    //     return;
    //   }
    
    
    setNotFound(true)
    setLoaded(false);
  
  }
  const handleChange = (event) => {
    setBasicAddon1(event.target.value)
  }
  useEffect(() => {
    fetchData();
  });

  // const filteredData = async (event) => {
  //   if (event.target.value.length > 2) {
  //     var characterSearchList = [];
  //     const url = url;
  //     const value = event.target.value;
  //     const searchIndex = value.substr(0, value.length);
  //     let searchUrl = url.replace("tempKey", searchIndex);

  //     characterSearchList.push(fetchData(searchUrl, 0));
  //     await Promise.all(characterSearchList);
  //     setCharacterList(data[0].data.results);
  //   }
  // }


  const reload = () => {
    window.location.reload();
  }






  return (
    <div className="searchBar">
      {loaded ? <PreLoader /> : null}
      {logo ? <Logo /> : null}
      {notFound ? <NotFound /> : null}
      <form>
        <div>
          <Container>
            <Row>
              {foundSearch.map(char =>
                (<Col md="12">
                  <p className="charName">{char.name} </p>
                  <a href={char.urls[1].url}><img src={char.thumbnail.path + "/detail.jpg"} className="imgDetail" />
                  </a>
                  {"\n"}
                  <p className="charDetails"> {char.description} </p>
                  <br />
                  <Button onClick={reload} variant="secondary" className="reset">Reset </Button>{' '}
                  <br />
                  <br />
                  <Comics comics={char.id} />
                </Col>))}
            </Row>
          </Container>

          {searchChar ?
            <div>
              <InputGroup className="mb-3" className="charSearch">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1"><img src={MarvelPng} className="marvelPng" /></InputGroup.Text>
                </InputGroup.Prepend>
                {/* <Typeahead
                    onChange={this.filteredData} 
                    options={this.state.characterList}
                  /> */}
                <FormControl
                  placeholder="Character Name"
                  aria-label="Character Name"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  value={basicAddon1 ? basicAddon1 : ""}
                />
              </InputGroup>
              <Button onClick={searchChar} variant="danger">Search</Button>
            </div>
            : null}
        </div>
      </form>
    </div>
  )

}





export default Search;