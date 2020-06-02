import React from "react";
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

      const basicAddon1 = null;
      const data = [];
      const foundSearch = []
      const url = null
      let  loaded = false
      const notFound = false
      let logo = true;
      const comics = []
      const totalLimit = null
      const characterList = []

    // this.searchChar = this.searchChar.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.fetchData = this.fetchData.bind(this);
    // this.filteredData = this.filteredData.bind(this)
    // this.reload = this.reload.bind(this);
  



  const fetchData = async (url, index) => {
    await fetch(url + index * 100)
      .then(response => response.json())
      .then(result => {
        this.setState(prevState => ({
          data: [result]})
          )}
        )}


  const searchChar = async () => {
    // Removing the logo and setting the preLoader 
    this.setState({
      loaded: true,
      logo: false,
      notFound: false,
    })

    var dataFetchPromises = [];
    let value = this.state.basicAddon1.toLowerCase();
    const foundSearch = [];
    const comics = [];
    const url = this.state.url;
    const searchIndex = value.substr(0, 4)
    let searchUrl = url.replace("tempKey", searchIndex);

      dataFetchPromises.push(this.fetchData(searchUrl, 0));
      await Promise.all(dataFetchPromises)

      for (let charName = 0; charName < this.state.data[0].data.results.length; charName++) {
        if (this.state.data[0].data.results[charName].name.toLowerCase().replace(/[\W]/g, "") == value.replace(/[\W]/g, "")) {

          foundSearch.push(this.state.data[0].data.results[charName]);
          this.setState({
            foundSearch: foundSearch,
            loaded: false,
            comics: comics,
            searchChar: false,
          })
          return;
        }
    }
    this.setState({
      notFound: true,
      loaded: false,
    })}

  const handleChange = (event) => {
    this.setState({
      basicAddon1: event.target.value
    });

  }

  const filteredData = async (event) => {
    if (event.target.value.length > 2) {
      var characterSearchList = [];
      const url = this.state.url;
      const value = event.target.value;
      const searchIndex = value.substr(0, value.length);
      let searchUrl = url.replace("tempKey", searchIndex);

      characterSearchList.push(this.fetchData(searchUrl, 0));
      await Promise.all(characterSearchList);

      this.setState({
        characterList: this.state.data[0].data.results,
      })
      console.log(this.state)
    }
  } 
  

  const reload = () => {
    window.location.reload();
  }

  // componentDidMount() {
  //   const API = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=';
  //   const key = 'tempKey&';
  //   const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
  //   const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
  //   const date = '1&';
  //   const limit = '&limit=' + 100;
  //   let url = API + key + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset='

  //   this.setState({
  //     url: url,
  //   })
  // }




    return (
      <div className="searchBar">
        {this.loaded ? <PreLoader /> : null}
        {this.state.logo ? <Logo /> : null}
        {this.state.notFound ? <NotFound /> : null}
        <form>
          <div>
            <Container>
              <Row>
                {foundSearch.map(char =>
                  (<Col md="12">
                    <p className="charName">{char.name} </p>
                    <a href={char.urls[1].url}><img src={char.thumbnail.path + "/detail.jpg"} className="imgDetail"/>
                    </a>
                    {"\n"}
                    <p className="charDetails"> {char.description} </p>
                    <br />
                    <Button onClick={this.reload} variant="secondary" className="reset">Reset </Button>{' '}
                    <br />
                    <br />
                    <Comics comics={char.id} />
                  </Col>))}
              </Row>
            </Container>
           
           {this.state.searchChar ? 
           <div>
            <InputGroup className="mb-3" className="charSearch">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><img src={MarvelPng} className="marvelPng" /></InputGroup.Text>
              </InputGroup.Prepend>
                  {/* <Typeahead
                    onChange={this.filteredData} 
                    options={this.state.characterList}
                  /> */}
              <FormControl ref={this.input}
                placeholder="Character Name"
                aria-label="Character Name"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={this.state.basicAddon1 ? this.state.basicAddon1 : ""}
              />
            </InputGroup>
            <Button onClick={this.searchChar} variant="danger">Search</Button>
            </div>
            : null }
          </div>
        </form>
      </div>
    )

                }





export default Search;