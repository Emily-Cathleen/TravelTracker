import Trip from './Trip';
import Traveler from "./Traveler";
import Destination from "./Destination";

class DataRepository {
  constructor(data) {
    this.travelers = data.travelers;
    this.currentTraveler;
    this.trips = data.trips;
    this.destinations = data.destinations;
    this.date;
  }

  createNewTraveler(travelerData) {
    this.currentTraveler = new Traveler(travelerData);
    this.currentTraveler.allTrips = this.getTravelerTrips(this.currentTraveler.id);
    this.sortTravelerTrips();
  }

  getTravelerTrips(travelerID) {
    const tripsByTravelerID = this.trips.filter(trip => {
      if (trip.userID === travelerID) {
        return trip
      }
    })
    // console.log(tripsByTravelerID)
    return tripsByTravelerID
  }

  currentDate(trip) {
    let endDate = trip.date.setDate(trip.duration)
     return new Date(trip.date).valueOf() <= new Date().valueOf() &&
     new Date(endDate).valueOf() >= new Date().valueOf()
  }

  isAfterToday(trip) {
    return new Date(trip.date).valueOf() > new Date().valueOf();
  }

  isBeforeToday(trip) {
    let endDate = trip.date.setDate(trip.duration)
    return new Date(endDate).valueOf() < new Date().valueOf();
  }
  //if my endDate < in miliseconds myCurrentDay, then this is going to be true
  //otherwise,this is going to be false

sortTravelerTrips() {
  this.currentTraveler.allTrips.forEach(trip => {
    trip.date = trip.date.replaceAll('/', '-');
    if(currentDate(trip)) {
      this.currentTraveler.presentTrips.push(trip)
    } else if (isAfterToday(trip)){
      this.currentTraveler.upcomingTrips.push(trip)
    } else if (isBeforeToday(trip)){
      this.currentTraveler.pastTrips.push(trip)
    } else if (trip.status === "pending") {
      this.currentTraveler.pendingTrips.push(trip)
    }
  })
}

  // calculateTotalSpentThisYear() {
  //   const totalLodging = this.destinations.estimatedLodgingCostPerDay * this.duration;
  //   const totalFlight = this.destinations.estimatedFlightCostPerPerson * this.travelerCount;
  //   const tripCost = totalLodging + totalFlight;
  //   const costWithAgentFee = tripCost + (tripCost * .10);
  //     this.tripCost = costWithAgentFee;
  //     return costWithAgentFee;
  //   }

}


export default DataRepository;
