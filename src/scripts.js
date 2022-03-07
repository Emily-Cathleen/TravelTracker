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
let currentTraveler;
let dataRepository;

//QUERY SELECTORS

const welcome = document.getElementById("welcome");
const dropDownMenuDestinations = document.getElementById("dropDownMenuDestinations");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");


//FUNCTIONS

const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchTripData(),
    fetchDestinationData(),
  ]).then((data) => parseAllData(data))
  // console.log("FETCH", fetchTravelerData())
};

const parseAllData = (data) => {
  const newTravelerID = getRandomIndex(data[0].travelers);
  const dataObject = {};
  dataObject.travelers = data[0].travelers.map(traveler => new Traveler(traveler));
  dataObject.trips = data[1].trips.map(trip => new Trip(trip));
  dataObject.destinations = data[2].destinations.map(destination => new Destination(destination));
  dataObject.currentTraveler;
  dataRepository = new DataRepository(dataObject);
  dataRepository.currentTraveler = dataRepository.getCurrentTraveler(newTravelerID);
  greetUser();
  populateDestinationDropDown(dataObject.destinations);
  // console.log("CURRENTRAVVVVVV", dataRepository.currentTraveler)
};

const getRandomIndex = (array) => {
  randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

const greetUser = (traveler) => {
  console.log("FIRSTNAME", dataRepository.getFirstName())
    welcome.innerText = `Adventure Awaits, ${dataRepository.getFirstName()}`;
  };

const populateDestinationDropDown = () => {
    dataRepository.destinations.forEach(destination => {
    dropDownMenuDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
  })
}

const displayPendingTrips = (id) => {
  
}



// const displayPastTrips = () => {
//   const travelersTrips = DataRepository.getTravelerTrips(random)
// }

// const displayCurrentTrips = () => {
//
// }

window.addEventListener('load', fetchAllData);
