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
let newTripDisplay;

//QUERY SELECTORS

const welcome = document.getElementById("welcome");
const dropDownMenuDestinations = document.getElementById("dropDownMenuDestinations");
const allTrips = document.getElementById("allTrips");
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
const estimatedCostOfTripButton = document.getElementById("estimatedCostOfTripButton");
const displayEstCost = document.getElementById("displayEstCost");
const userNameInput = document.getElementById("userNameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const loggedInUser = document.getElementById("loggedInUser");
const loginPage = document.getElementById("loginPage");


//FUNCTIONS

const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchTripData(),
    fetchDestinationData(),
  ]).then((data) => parseAllData(data))
};

const parseAllData = (data) => {
  const newTravelerID = data[0].travelers[5].id;
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
  // console.log("DATAOBJTRIPS", dataObject.trips)
  populateDestinationDropDown(dataObject.destinations);
};

const addHidden = (element) => {
  element.classList.add("hidden");
}

const removeHidden = (element) => {
  element.classList.remove("hidden");
}



const showUserProfile = () => {
  addHidden(loginPage);
  removeHidden(loggedInUser);

}

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
  // currentUser = dataRepository.currentTraveler;
  const getTrips = dataRepository.getTravelerTrips(currentUser.id);
  getTrips.forEach(trip => {
// dataRepository.currentTraveler.allTrips.push(trip)
const destinationObject = dataRepository.getDestinationName(trip.destinationID);
    allTrips.innerHTML += `
    <div id="${Date.now()}">
        <p>Destination: ${destinationObject.destination}</p>
        <img src="${destinationObject.image}"/>
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

const displayEstimate = (event) => {
  console.log(numberOfTravelersInput.value);
  console.log(userInputTripDuration.value);
  console.log(dropDownMenuDestinations.value);
  event.preventDefault()

  const newlyCreatedTrip = {
    travelers: numberOfTravelersInput.value,
    duration: userInputTripDuration.value
  }
  const destinationID = dataRepository.getDestinationById(parseInt(dropDownMenuDestinations.value))
  console.log("DESTINATIONID", destinationID)
  displayEstCost.innerHTML += `
  <p class="display-est-cost" id="displayEstCost">Estimated Trip Cost: ${dataRepository.getEstimatedTripCost(newlyCreatedTrip, destinationID)}</p>
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
  newTripDisplay = `
  <div id="viewNewTrips" class="new-trips">
  <p>Destination: ${newTrip.destinationID}</p>
  <p>Date: ${newTrip.date}</p>
  <p>Duration: ${newTrip.duration} days</p>
  </div>
  `
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
  pageReload();


 // viewNewTrips.innerHTML += newTripDisplay;

  // allTrips.innerHTML += `
  // <div id="viewNewTrips" class="new-trips">
  // <p>Destination: ${newTrip.destinationID}</p>
  // <p>Date: ${newTrip.date}</p>
  // <p>Duration: ${newTrip.duration} days</p>
  // </div>
  // `
};

const pageReload = () => {
  window.location.reload();
}


window.addEventListener('load', fetchAllData);
estimatedCostOfTripButton.addEventListener('click', event => {displayEstimate(event)});
submitButton.addEventListener('click', event => {createNewTrip(event)});
