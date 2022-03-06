import Trip from './Trip.js';

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.allTrips;
    this.pastTrips = [];
    this.presentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName
  }

 //  getAllTrips(allTrips, allDestinations) {
 //   let filteredTrips = allTrips.filter(trip => trip.userID === this.id);
 //   let currentDestination;
 //   filteredTrips.forEach(trip => {
 //     allDestinations.forEach(location => {
 //       if (trip.destinationID === location.id) {
 //         currentDestination = location;
 //         this.allTrips.push(new Trip(trip, currentDestination));
 //       }
 //     })
 //   })
 //   return this.allTrips
 // }



}




export default Traveler
