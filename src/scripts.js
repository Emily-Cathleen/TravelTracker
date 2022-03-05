import './css/base.scss';
import './images/turing-logo.png'

import Traveler from "./Traveler";
import Destination from "./Destination";
import Trip from "./Trip";
import DataRepository from "./DataRepository";

import {
  fetchTravelerData,
  fetchTripData,
  fetchDestinationData,
} from "./apiCalls.js";

//GLOBALS
let allData = {};
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
  const dataRepository = {};
  dataRepository.travelers = data[0].travelers.map(traveler => new Traveler(traveler));
  dataRepository.trips = data[1].trips.map(trip => new Trip(trip));
  dataRepository.destinations = data[2].destinations.map(destination => new Destination(destination));
  allData = new DataRepository(dataRepository);
  console.log("DATAREPO", allData)
  getRandomIndex(allData.travelers)
};

const getRandomIndex = (array) => {
  randomIndex = Math.floor(Math.random() * array.length);
  greetUser(allData.randomIndex)
};

const greetUser = (traveler) => {
    welcome.innerText = `Adventure Awaits, ${allData.travelers[randomIndex].getFirstName()}`;
  };

// const displayCurrentTrips = () => {
//
// }

window.addEventListener('load', fetchAllData);
