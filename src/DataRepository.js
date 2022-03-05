// import dayjs from 'dayjs'

class DataRepository {
  constructor(data) {
    this.travelers = data.travelers;
    this.trips = data.trips;
    this.destinations = data.destinations;
  }

// getTravelerTrips(travelerID) {
//   const tripsByTravelerID = this.trips.filter(trip > trip.travelerId === userID)
// }
//
//

calculateTotalSpentThisYear() {
  const totalLodging = this.destinations.estimatedLodgingCostPerDay * this.duration;
  const totalFlight = this.destinations.estimatedFlightCostPerPerson * this.travelerCount;
  const tripCost = totalLodging + totalFlight;
  const costWithAgentFee = tripCost + (tripCost * .10);
    this.tripCost = costWithAgentFee;
    return costWithAgentFee;
  }

}


export default DataRepository;
