import './css/base.scss';
import './images/turing-logo.png'

// import dayjs from 'dayjs';
import Traveler from "./Traveler";
import Destination from "./Destination";
import Trip from "./Trip";
import DataRepository from "./DataRepository";

import {
  fetchTravelerData,
  fetchTripData,
  fetchDestinationData,
  postNewTrip
} from "./apiCalls.js";

//GLOBALS
let allData = {};
let travelers;
let trips;
let destinations;
let randomIndex;
let currentUser;
let dataRepository;

//QUERY SELECTORS

const welcome = document.getElementById("welcome");
const dropDownMenuDestinations = document.getElementById("dropDownMenuDestinations");
const pastTrips = document.getElementById("pastTrips");
const pendingTrips = document.getElementById("pendingTrips");
const totalSpentThisYear = document.getElementById("totalSpentThisYear");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");
const numberOfTravelersInput = document.getElementById("numberOfTravelersInput");
const submitButton = document.getElementById("submitButton");
const userInputTripDuration = document.getElementById("userInputTripDuration");
const postSuccessMessage = document.getElementById("postSuccessMessage");
const viewNewTrips = document.getElementById("viewNewTrips");
const formWrapper = document.querySelector(".form-wrapper");


//FUNCTIONS

const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchTripData(),
    fetchDestinationData(),
  ]).then((data) => parseAllData(data))
};

const parseAllData = (data) => {
  const newTravelerID = data[0].travelers[2].id;
  const dataObject = {};
  dataObject.travelers = data[0].travelers.map(traveler => new Traveler(traveler));
  dataObject.trips = data[1].trips.map(trip => new Trip(trip));
  dataObject.destinations = data[2].destinations.map(destination => new Destination(destination));
  dataObject.currentTraveler;
  dataRepository = new DataRepository(dataObject);
  dataRepository.currentTraveler = dataRepository.getCurrentTraveler(newTravelerID);
  currentUser = dataRepository.currentTraveler;
  greetUser();
  displayAllTrips();
  displayAnnualTripCost();
  populateDestinationDropDown(dataObject.destinations);
};

const greetUser = () => {
  welcome.innerText = `Adventure Awaits, ${dataRepository.getFirstName()}`;
};

const populateDestinationDropDown = () => {
  dataRepository.destinations.forEach(destination => {
    dropDownMenuDestinations.innerHTML += `<option id="${destination.destination}" value="${destination.id}">${destination.destination}</option>`
  })
};

const getNameFromID = (destinationID) => {
   dataRepository.destinations.find(destination => {
    return destination.id === destinationID
   })
}

const displayAllTrips = () => {
  const getTrips = dataRepository.getTravelerTrips(currentUser.id);
  getTrips.forEach(trip => {
    const destinationName = dataRepository.getDestinationName(trip.destinationID);
    pastTrips.innerHTML += `
    <div id="${Date.now()}">
        <p>Destination: ${destinationName.destination}</p>
        <img src="${destinationName.image}"/>
        <p>Date: ${trip.date}</p>
        <p>Travelers: ${trip.travelers}
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
      </div>
    `
  })
};

const displayAnnualTripCost = () => {
  const displayTotal = dataRepository.getAnnualTripsCost(currentUser.id);
  totalSpentThisYear.innerHTML += `
  <p id="totalSpentThisYear" class="total-spent">Total Spent On Trips: ${displayTotal}</p>
`
}

const createNewTrip = (event) => {
  event.preventDefault();
  const newTrip = {
    id: Date.now(),
    userID: parseInt(currentUser.id),
    destinationID: parseInt(dropDownMenuDestinations.value),
    travelers: parseInt(numberOfTravelersInput.value),
    date: startDateInput.value.replaceAll("-", "/"),
    duration: parseInt(userInputTripDuration.value),
    status: "pending",
    suggestedActivities: [],
  }
  postNewTrip(newTrip)
  .then(data => {    // data is success message. Yes, your trip was posted! display this eventually.
    postSuccessMessage.innerText += `${data.message}`
    fetchAllData()
  })
  .catch((error) => {
    // errorHandling(response);
    // console.log(errorHandling());
  });

  formWrapper.reset()

  viewNewTrips.innerHTML += `
  <div id="viewNewTrips" class="new-trips">
  <p>Destination: ${newTrip.destinationID}</p>
  <p>Date: ${newTrip.date}</p>
  <p>Duration: ${newTrip.duration} days</p>
  </div>
  `

  pastTrips.innerHTML += `
  <div id="viewNewTrips" class="new-trips">
  <p>Destination: ${newTrip.destinationID}</p>
  <p>Date: ${newTrip.date}</p>
  <p>Duration: ${newTrip.duration} days</p>
  </div>
  `
};


window.addEventListener('load', fetchAllData);
submitButton.addEventListener('click', event => {createNewTrip(event)});
