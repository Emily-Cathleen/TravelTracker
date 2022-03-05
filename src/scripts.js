import './css/base.scss';
import './images/turing-logo.png'

import Traveler from "./Traveler";
import Destination from "./Destination";
import Trip from "./Trip";

import {
  fetchTravelerData,
  fetchTripData,
  fetchDestinationData,
} from "./apiCalls.js";

//GLOBALS
let data = {}
let travelers;
let trips;
let destinations;
let randomIndex;

//QUERY SELECTORS

const welcome = document.getElementById("welcome");

//FUNCTIONS

const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchTripData(),
    fetchDestinationData(),
  ]).then((data) => parseAllData(data))
};

const parseAllData = (data) => {
  console.log("DAATT", data)
  travelers = data[0].travelers.map(traveler => new Traveler(traveler));
  // trips = data[1].trips.map(trip => new Trip(trip));
  // destinations = data[2].destinations.map(destination => new Destination(destination));
  getRandomIndex(travelers)
};

const getRandomIndex = (array) => {
  randomIndex = Math.floor(Math.random() * array.length);
  greetUser(randomIndex)
};

const greetUser = (traveler) => {
    welcome.innerText = `Adventure Awaits, ${travelers[randomIndex].getFirstName()}`;
  };

window.addEventListener('load', fetchAllData);
