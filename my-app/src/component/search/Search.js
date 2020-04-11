import React from "react";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import './Search.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import NotFound from '../notfound/notfound.js'


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
    };
    this.searchChar = this.searchChar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async searchChar() {


    this.setState({
      loaded: true,
    })


    let value = this.state.basicAddon1.toLowerCase();
    const foundSearch = [];
    const url = this.state.url;
    const offsetLimit = 15;



    for (let index = 0; index < offsetLimit; index++) {
      const response = await fetch(url + index * 100)
      const data = await response.json();


      for (let charName = 0; charName < data.data.results.length; charName++) {
        let character = data.data.results[charName].name.toLowerCase().replace(/[\W]/g, "");

        if (character === value.replace(/[\W]/g, "")) {
          foundSearch.push(data.data.results[charName]);
          this.setState({
            foundSearch: foundSearch,
            loaded: false,
          })
          return;
        }
      }
    }
    this.setState({
      notFound: true,
      loaded: false,
    })
  }


  handleChange = (event) => {
    this.setState({
      basicAddon1: event.target.value
    });
  }



  componentDidMount() {

    const API = 'https://gateway.marvel.com/v1/public/characters?';
    const pubKey = 'd3c4d49ca5140158b141102b27d684ae&';
    const hash = '9674d68e3057ba20fef81d98f535e7eb&limit=100';
    const date = '1&';
    const limit = '&limit=' + 100;

    const url = API + 'ts=' + date + 'apikey=' + pubKey + 'hash=' + hash + limit + '&offset='

    this.setState({
      url: url,
    })
  }



  render() {

    // const filteredData = char.filter(char => char.thumbnail.path !== notAva );
    const { foundSearch } = this.state;

    if (this.state.loaded || !this.state.foundSearch) {
      return (
        <div className="searchBar">
          <div>
            <div>
              <button className="buttonLoad">
                <i className="fa fa-circle-o-notch fa-spin fa-5x"></i>
                <br />
                <p className="preLoader">Searching Database</p>
              </button>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.notFound) {
      return (
      <NotFound />
      )
    }
    else if (this.state.foundSearch) {
      return (
        <div className="searchBar">
          <form>
            <div>
              <Container>
                <Row>
                  {foundSearch.map(char =>
                    (<Col md="12">
                      <p className="charName">{char.name}</p>
                      {<img src={char.thumbnail.path + "/standard_medium.jpg"} />}
                      {"\n"}
                      <p className="charDetails">{char.description}</p>
                      <br />
                      <p className="charDetails">{char.name} has appeared in {char.comics.available} different Marvel comics.</p>

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
}



export default search;