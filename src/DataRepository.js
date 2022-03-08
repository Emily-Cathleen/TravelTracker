import Trip from './Trip';
import Traveler from "./Traveler";
import Destination from "./Destination";
// import dayjs from 'dayjs';

class DataRepository {
  constructor(data) {
    this.travelers = data.travelers;
    this.currentTraveler = data.currentTraveler;
    this.trips = data.trips;
    this.destinations = data.destinations;
    this.date;
    this.tripCost;
  }

  getCurrentTraveler(id) {
    const travelerInfo = this.travelers.find(traveler => traveler.id === id)
    this.currentTraveler = travelerInfo
    return travelerInfo
  }

  getFirstName() {
    const firstName = this.currentTraveler.name.split(" ")[0];
    return firstName
  }

  createNewTraveler(travelerData) {
    this.currentTraveler = new Traveler(travelerData);
    this.currentTraveler.allTrips = this.getTravelerTrips(this.currentTraveler.id);
    // this.sortTravelerTrips();
  }

  getTravelerTrips(travelerID) {
    const tripsByTravelerID = this.trips.filter(trip => {
      if (trip.userID === travelerID) {
        this.currentTraveler.allTrips.push(trip)
        // console.log("LOOK", this.currentTraveler.allTrips)
        return trip
      }
    })
    return tripsByTravelerID
  }

  date() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let currentDate = `${yyyy}/${mm}/${dd}`;
    return currentDate;
  }

  sortTrips(trips) {
    const sorted = this.currentTraveler.allTrips.forEach(trip => {
      let dest = this.getDestinationName(trip.destinationID)
      let tripYear = parseInt(trip.date.split('/')[0])
      if (tripYear === 2022) {
        this.currentTraveler.presentTrips.push(trip)
        if (trip.status === 'approved') {
          this.currentTraveler.presentTrips.push(trip)
        } else {
          this.currentTraveler.pendingTrips.push(trips)
        }
      } else {
        this.currentTraveler.pastTrips.push(trip)
      }
    })
    return sorted
  }


  getDestinationName(destinationID) {
    const name = this.destinations.find(destination => {
      return destination.id === destinationID
    })
    return name
  }

  getAnnualTripsCost(userID) {
    const userTrips = this.currentTraveler.allTrips.filter(trip => {
      let tripYear = parseInt(trip.date.split('/')[0])
      return tripYear === 2022
    })
    const findPrice = userTrips.reduce((acc, currentTrip) => {
      this.destinations.forEach(destination => {
        if (destination.id === currentTrip.destinationID) {
          acc += destination.estimatedLodgingCostPerDay * currentTrip.duration;
          acc += destination.estimatedFlightCostPerPerson * currentTrip.travelers;
        }
      })
      return acc
    }, 0)
    return findPrice * 1.1;
  }

  getDestinationById(id) {
    const result = this.destinations.find(destination => {
      if (destination.id === id) {
        return destination
      }
    })
    return result
  }

  getEstimatedTripCost(trip, destination) {
    console.log("LOOKHERE", destination)
    const tripTotal = (destination.estimatedLodgingCostPerDay * trip.duration) +
      (destination.estimatedFlightCostPerPerson * trip.travelers)
    const fee = tripTotal / 0.1
    return fee + tripTotal
  }

};


export default DataRepository;
