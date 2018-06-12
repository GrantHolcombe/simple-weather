import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityValue: '',
      weatherData: {list:[]},
      filteredData: {list:[]}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.filterMin = this.filterMin.bind(this);
    this.filterMax = this.filterMax.bind(this);
    this.filterMean = this.filterMean.bind(this);
    this.filterMode = this.filterMode.bind(this);
  }

  handleChange(e) {
    const newValue = e.target.value
    this.setState({
      cityValue: newValue
    })
  }

  handleSubmit(city) {
    var self = this;
    axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: self.state.cityValue + ',us',
        appid: '9f5fc9de651165e5463cacdcb45311f0',
        units: 'imperial'
      }
    })
    .then(function (response) {
      self.setState({
        weatherData: response.data,
        filteredData: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
      if(error.message === 'Request failed with status code 404') {
        alert("Doesn't look like that worked, please make sure you enter a valid US City or State");
      }
    });

  }

  filterMin() {
    var min = this.state.weatherData.list[0].main.temp
    var minItem = this.state.weatherData.list[0]

    this.state.weatherData.list.forEach(function(item) {
      var newMin = item.main.temp
      if( newMin < min) {
        min = newMin
        minItem = item
      }
    });

    this.setState({
      filteredData: {list:[minItem]}
    });
  }

  filterMax() {
    var max = this.state.weatherData.list[0].main.temp
    var maxItem = this.state.weatherData.list[0]

    this.state.weatherData.list.forEach(function(item) {
      var newMax = item.main.temp
      if( newMax > max) {
        max = newMax
        maxItem = item
      }
    });

    this.setState({
      filteredData: {list:[maxItem]}
    });
  }

  filterMean() {
    var arr =[];
    var sum = 0;
    this.state.weatherData.list.forEach(function(item) {
      arr.push(item.main.temp);
    })

    for( var i = 0; i < arr.length; i++ ){
        sum += parseInt( arr[i], 10 ); //don't forget to add the base
    }

    var avg = sum/arr.length;
    avg = Math.round(avg * 100) / 100

    this.setState({
      filteredData: {list:[{
        main : {
          temp: avg,
          humidity: null
        },
        dt_txt: 'Average Temp',
      }]}
    });

  }

  filterMode() {
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    var arr = [];

    this.state.weatherData.list.forEach(function(item) {
      arr.push(Math.round(item.main.temp));
    })

    arr.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;

        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
    });

    this.setState({
      filteredData: {list:[{
        main : {
          temp: mode,
          humidity: null
        },
        dt_txt: 'Mode Temp (rounded to whole numbers)',
      }]}
    });
  }

  render() {
    const forecasts = this.state.filteredData.list
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Simple Weather App</h1>
          </Col>
          <Col sm={5} smOffset={3}>
            <FormGroup>
              <FormControl
                bsSize="lg"
                type="text"
                placeholder="Look up a City"
                value={this.state.cityValue}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm={2}>
            <Button bsSize="lg" onClick={ () => this.handleSubmit(this.state.cityValue) }>Search</Button>
          </Col>
        </Row>
        <Row>
         <Col className="text-center" xs={12}>
          <h2>Filter your data</h2>
          <Button bsSize="lg" className={this.state.filteredData.list.length < 1 ? 'disabled' : ''} style={{borderRadius: '6px 0 0 6px'}} onClick={this.state.filteredData.list.length > 0 ? this.filterMin : null}>Min</Button>
          <Button bsSize="lg" className={this.state.filteredData.list.length < 1 ? 'disabled' : ''} style={{borderRadius: 0}} onClick={this.state.filteredData.list.length > 0 ? this.filterMax : null}>Max</Button>
          <Button bsSize="lg" className={this.state.filteredData.list.length < 1 ? 'disabled' : ''} style={{borderRadius: 0}} onClick={this.state.filteredData.list.length > 0 ? this.filterMean : null}>Mean</Button>
          <Button bsSize="lg" className={this.state.filteredData.list.length < 1 ? 'disabled' : ''} style={{borderRadius: '0 6px 6px 0'}} onClick={this.state.filteredData.list.length > 0 ? this.filterMode : null}>Mode</Button>
         </Col>
        </Row>

        <Row className="labels text-center">
          <Col sm={4}>
            <h3>Date/Time</h3>
          </Col>
          <Col sm={4}>
            <h3>Temperature (°F)</h3>
          </Col>
          <Col sm={4}>
            <h3>Humidity</h3>
          </Col>
        </Row>

      {forecasts.map((item, index) => (
        <Row key={index} className="data text-center">
          <Col sm={4}>
            <p>{item.dt_txt}</p>
          </Col>
          <Col sm={4}>
            <p>{item.main.temp} °F</p>
          </Col>
          <Col sm={4}>
            <p>{item.main.humidity === null ? null : item.main.humidity + ' %'}</p>
          </Col>
        </Row>
      ))}

      </Grid>
    );
  }
}

export default App;
