import React from "react";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import './Search.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import NotFound from '../notfound/notfound.js';
import PreLoader from '../preload/preload.js';
import Logo from '../logo/logo.js'
import Comics from '../comics/comics.js';




class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicAddon1: null,
      data: null,
      foundSearch: [],
      url: null,
      loaded: false,
      notFound: false,
      logo: true,
      comics: [],
    };
    this.searchChar = this.searchChar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }



    fetchData = (url, index) => {
      fetch(url + index * 100)
      .then(response => response.json())
        .then( data => this.setState({data: data}))
        }
    

    searchChar = () => {
      this.setState({
        loaded: true,
        logo: false,
        notFound: false,
      })
  
      let value = this.state.basicAddon1.toLowerCase();
      const foundSearch = [];
      const comics = [];
      const url = this.state.url;
      const offsetLimit = 5;
      const searchIndex = value.charAt(0)  
      let searchUrl = url.replace("tempKey", searchIndex);
  
 
          for(let apiSearch = 0; apiSearch < offsetLimit; apiSearch++){
            this.fetchData(searchUrl, apiSearch);

            console.log(this)
          //     for(let charName = 0; charName < this.state.data.total; charName++){
          //      if(this.data.results[charName].name.toLowerCase().replace(/[\W]/g, "") == value.replace(/[\W]/g, "")){
          //       console.log(this.data)
          //      }
          // }
    
              
              // .name.toLowerCase().replace(/[\W]/g, "");

              // if (character === value.replace(/[\W]/g, "")) {
              //   foundSearch.push(result.data.results[charName]);

              //   this.setState({
              //     foundSearch: foundSearch,
              //     loaded: false,
              //     comics: comics,
              //   })
              //   return;
              // }
            
            this.setState({
              notFound: true,
              loaded: false,
            })
  }
}



  handleChange = (event) => {
    this.setState({
      basicAddon1: event.target.value
    });
  }

  componentDidMount() {

    const API = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=';
    const key = 'tempKey&';
    const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
    const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
    const date = '1&';
    const limit = '&limit=' + 100;
    let url = API + key + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset='

    this.setState({
      url: url,
    })
  }



  render() {
    const { foundSearch, comics } = this.state;
    // if (this.state.loaded && !this.state.foundSearch) {
    //   return (
    //     <PreLoader />
    //   )
    // }
    // else if (this.state.foundSearch) {
      return (

        <div className="searchBar">
          {this.state.loaded ? <PreLoader /> : null}
          {this.state.logo ? <Logo /> : null}
          {this.state.notFound ? <NotFound /> : null}
          <form>
            <div>
              <Container>
                <Row>
                  {foundSearch.map(char =>
                    (<Col md="12">
                      <p className="charName">{char.name} </p>
                      <a href={char.urls[1].url}><img src={char.thumbnail.path + "/detail.jpg"} />
                      </a>
                      {"\n"}
                      <p className="charDetails"> {char.description} </p>
                      <br />
                      <Comics comics={comics} />
                    </Col>))}
                </Row>
              </Container>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Character Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl ref={this.input}
                  placeholder="Character Name"
                  aria-label="Character Name"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
                  value={this.state.basicAddon1 ? this.state.basicAddon1 : ""}
                />
              </InputGroup>
              <Button onClick={this.searchChar} variant="outline-danger">Search</Button>
            </div>
          </form>
        </div>
      )
    
  }
  }




export default search;