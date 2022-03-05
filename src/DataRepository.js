// import dayjs from 'dayjs'

class DataRepository {
  constructor(data) {
    this.travelers = data.travelers;
    this.trips = data.trips;
    this.destinations = data.destinations;
  }

getTravelerTrips(travelerID) {
  const tripsbyTravelerID = this.trips.filter(trip > trip.travelerId === userI)
}
//
// calculateTotalSpentThisYear()

}


export default DataRepository;
