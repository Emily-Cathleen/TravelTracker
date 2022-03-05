import chai from 'chai';
const expect = chai.expect;
import DataRepository from "../src/DataRepository";
import Traveler from "../src/Traveler";
import Trip from "../src/Trip";
import Destination from "../src/Destination";
import destinationTestData from "../src/sample-data/destination-test-data";
import tripTestData from "../src/sample-data/trip-test-data";
import travelerTestData from "../src/sample-data/traveler-test-data";


describe("DataRepository", () => {
  let dataRepository1;
  let dataRepositoryTestData;
  let travelerData;
  let tripData;
  let destinationData;

  beforeEach(() => {

    travelerData = travelerTestData.map((traveler) => new Traveler(traveler));
    tripData = tripTestData.map((trip) => new Trip(trip));
    destinationData = destinationTestData.map((destination) => new Destination(destination));

    dataRepositoryTestData = {
      travelers: travelerData,
      trips: tripData,
      destinations: destinationData
    }

    dataRepository1 = new DataRepository(dataRepositoryTestData)
  })

})
