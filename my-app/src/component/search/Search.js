import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
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

  // React Docs say to declare multiple state variables ???
  const [basicAddon1, setBasicAddon1] = useState(null);
  const [data, setData] = useState({data: []});
  const [foundSearch, setFoundSearch] = useState([]);
  let [apiRequest, changeApiRequest ] = useState(false)
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


  const fetchData = (url, index) => {
    console.log(url)
    fetch(url + index * 100)
      .then(response => response.json())
      .then(result =>
        setData(result.data.results)
      )
      .catch(error =>
        console.log("Data not returned" + error)
      )
  }


  const searchChar = () => {
    let value = basicAddon1.toLowerCase();
    const searchIndex = value.substr(0, 4);
    let searchUrl = url.replace("tempKey", searchIndex);

    // Removing the logo and setting the preLoader.
    setLoaded(true);
    setLogo(false)
    setNotFound(false)
    changeApiRequest(true)
    // Fetching the results from the API call.
    fetchData(searchUrl, 0)
}

  const handleChange = (event) => {
    setBasicAddon1(event.target.value)
  }
  const reload = () => {
    window.location.reload();
  }

useEffect(() => {
  if(apiRequest){
    let value = basicAddon1.toLowerCase();
    for (let charName = 0; charName < data.length; charName++) {
      if (data[charName].name.toLowerCase().replace(/[\W]/g, "") == value.replace(/[\W]/g, "")) {
        foundSearch.push(data[charName]);
        setFoundSearch(foundSearch);
        setLoaded(false);
        console.log(foundSearch)
        return;
      }
    }
        setNotFound(true)
        setLoaded(false);
  }

 
}, [data])


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
                   <div>
                     <Container>
                       <Row>
                 <Col md="6">
                  <p className="detailName">Biography</p>
                  <p className="charDetails">{char.description} </p>
                 </Col>
                  <Col md="6">
                    <div>
                  <p className="detailName">Appearances</p>
                  <p className="detailBio">Appeared in {char.stories.available} Marvel stories</p>
                  <p className="detailBio">Appeared in {char.comics.available} Marvel comics</p>
                  </div>
                  </Col>
                  </Row>
                  </Container>
                  </div>
                  <Button onClick={reload} variant="secondary" className="reset">Reset </Button>{' '}
                  <Comics comics={char.collectionURI} />
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