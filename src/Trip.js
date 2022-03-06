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
    //setDate for start and end date. Field for each of them and pick specific date.
    //reassign the date using varibleName input.value
    this.tripEndDate;
    this.tripCost;
  }

  

}


export default Trip;
