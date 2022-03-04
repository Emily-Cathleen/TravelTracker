import './css/base.scss';
import './images/turing-logo.png'

import Traveler from "./Traveler";
import Destination from "./Destination";
import Trip from "./Trip";

import {
  fetchUserData,
  fetchTripsData,
  fetchDestinationData,
} from "./apiCalls.js";

//GLOBALS
let data = {}
let currentTraveler;


const instantiateTraveler = (id) => {
  currentTraveler = new Traveler
}
