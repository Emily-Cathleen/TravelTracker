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
let parsedID;

//QUERY SELECTORS

const welcome = document.getElementById("welcome");
const dropDownMenuDestinations = document.getElementById("dropDownMenuDestinations");
const allTrips = document.getElementById("allTrips");
const pastTrips = document.getElementById("pastTrips");
const futureTrips = document.getElementById("futureTrips");
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
  const newTravelerID = parsedID;
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
  displayPastTrips();
  displayFutureTrips();
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


const parseUserName = () => {
 parsedID = parseInt(userNameInput.value.substring(8));
};


const showUserProfile = () => {
  parseUserName();
  if(parsedID <= 50 && passwordInput.value === "travel") {
    addHidden(loginPage);
    removeHidden(loggedInUser);
    fetchAllData();
  }
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

const createTripDisplay = (tripType, location) => {
  tripType.forEach(trip => {
      const destinationObject = dataRepository.getDestinationName(trip.destinationID);
    location.innerHTML += `
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
}

const displayAllTrips = () => {
  const getTrips = dataRepository.getTravelerTrips(currentUser.id);
  createTripDisplay(getTrips, allTrips)

};

const displayPastTrips = () => {
  dataRepository.sortPastTrips();
  const getPastTrips = currentUser.pastTrips
  createTripDisplay(getPastTrips, pastTrips)

}

const displayFutureTrips = () => {
  dataRepository.sortFutureTrips();
  const getFutureTrips = currentUser.futureTrips
  createTripDisplay(getFutureTrips, futureTrips)

}

const displayAnnualTripCost = () => {
  const displayTotal = dataRepository.getAnnualTripsCost(currentUser.id);
  const formatCurrency = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(displayTotal)
  totalSpentThisYear.innerHTML = `
  <p id="totalSpentThisYear" class="total-spent">Total Spent On Trips: ${formatCurrency}</p>
`
}

const displayEstimate = (event) => {
  event.preventDefault()
  const newlyCreatedTrip = {
    travelers: numberOfTravelersInput.value,
    duration: userInputTripDuration.value
  }
  const destinationID = dataRepository.getDestinationById(parseInt(dropDownMenuDestinations.value))
  console.log("DESTINATIONID", destinationID)
  displayEstCost.innerHTML = `
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
    // fetchAllData()

  })
  .catch((error) => {
    // errorHandling(response);
    // console.log(errorHandling());
  });

  formWrapper.reset()
  displayEstCost.innerHTML = ' '
  fetchAllData()

  // pageReload();

};

const pageReload = () => {
  window.location.reload();
}


// window.addEventListener('load', fetchAllData);
estimatedCostOfTripButton.addEventListener('click', event => {displayEstimate(event)});
submitButton.addEventListener('click', event => {createNewTrip(event)});
loginButton.addEventListener('click', showUserProfile)
