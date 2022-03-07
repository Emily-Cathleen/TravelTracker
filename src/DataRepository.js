import Trip from './Trip';
import Traveler from "./Traveler";
import Destination from "./Destination";

class DataRepository {
  constructor(data) {
    this.travelers = data.travelers;
    this.currentTraveler = data.currentTraveler;
    this.trips = data.trips;
    this.destinations = data.destinations;
    this.date;
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
        return trip
      }
    })
    return tripsByTravelerID
  }

getPendingTrips() {
  const pending = this.trips.filter(trip => {
    if(trip.status === "pending") {
    this.currentTraveler.pendingTrips.push(trip)
  }
})
  return pending
}

 //  getPastTrips(currentDate) {
 //   const pastTrips = this.trips.filter(trip => {
 //     const tripDate = new Date(`${trip.date}`).getTime();
 //     if (currentDate > tripDate) {
 //       return trip;
 //     }
 //   });
 //   traveler.pastTrips = pastTrips;
 //   return pastTrips;
 // }


 // calculateTotalSpentThisYear() {
 //   const totalLodging = this.destinations.estimatedLodgingCostPerDay * trips.duration;
 //   const totalFlight = this.destinations.estimatedFlightCostPerPerson * this.travelerCount;
 //   const tripCost = totalLodging + totalFlight;
 //   const costWithAgentFee = tripCost + (tripCost * .10);
 //     this.tripCost = costWithAgentFee;
 //     return costWithAgentFee;
 //   }



}


export default DataRepository;
