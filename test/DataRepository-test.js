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
  let dataRepository;
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

    dataRepository = new DataRepository(dataRepositoryTestData)
  });

  it("should be a function", function () {
    expect(DataRepository).to.be.a("function");
  });

  it("should be an instance of DataRepository", function () {
    expect(dataRepository).to.be.an.instanceof(DataRepository);
  });

  it("should store traveler data", function () {
    expect(dataRepository.travelers).to.be.equal(travelerData);
  });

  it("should store trips data", function () {
    expect(dataRepository.trips).to.be.equal(tripData);
  });

  it("should store destination data", function () {
    expect(dataRepository.destinations).to.be.equal(destinationData);
  });






  // it("should get the Travelers trips", function () {
  //   expect(dataRepository.getTravelerTrips(44)).to.eql([])
  // });

  // it("should return the current day", function () {
  //   expect(dataRepository.currentDate()).to.equal("2022-03-05T22:45:54.914Z")
  // });
  //
  // it("should return a future date ", function () {
  //   expect(dataRepository.isAfterToday()).to.equal("2022-06-05T22:45:54.914Z")
  // });
  //
  // it("should return a past date ", function () {
  //   expect(dataRepository.isBeforeToday()).to.equal("2022-02-05T22:45:54.914Z")
  // });


})
