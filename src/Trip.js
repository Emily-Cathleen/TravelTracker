import DataRepository from './DataRepository.js';

class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.tripStartDate;
    this.tripEndDate;
  }

  findTripDuration() {
    let tripStart = new Date(this.date);
    let tripEnd = new Date(this.date).setDate(new Date(this.date).getDate() + this.duration);
    this.tripStartDate = tripStart.getTime();
    this.tripEndDate = tripEnd;
  }

}


export default Trip;
