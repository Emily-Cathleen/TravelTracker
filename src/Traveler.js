import Trip from './Trip.js';
// import dayjs from 'dayjs';


class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
  }


}


export default Traveler
