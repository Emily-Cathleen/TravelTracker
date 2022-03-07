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

    dataRepository = new DataRepository(dataRepositoryTestData);
  });

  it("should be a function", function() {
    expect(DataRepository).to.be.a("function");
  });

  it("should be an instance of DataRepository", function() {
    expect(dataRepository).to.be.an.instanceof(DataRepository);
  });

  it("should store traveler data", function() {
    expect(dataRepository.travelers).to.be.equal(travelerData);
  });

  it("should store trips data", function() {
    expect(dataRepository.trips).to.be.equal(tripData);
  });

  it("should store destination data", function() {
    expect(dataRepository.destinations).to.be.equal(destinationData);
  });

  it("should create a new traveler", function() {
    expect(dataRepository.createNewTraveler(travelerData)).to.be.equal();
  });

  it("should get the Travelers trips", function() {
    expect(dataRepository.getTravelerTrips(35)).to.eql(
      [{
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: []
      }])
  });

  // it("should return the travelers first name", () => {
  //   expect(traveler1.getFirstName()).to.equal("Ham");
  // });
  //
  // it("should return the travelers pending trips", function() {
  //   currentTraveler = dataRepository.getCurrentTraveler(38);
  //   dataRepository.getPendingTrips()
  //   expect(dataRepository.currentTraveler.pendingTrips).to.eql(
  //     [{
  //       id: 71,
  //       userID: 38,
  //       destinationID: 28,
  //       travelers: 1,
  //       date: "2020/05/26",
  //       duration: 11,
  //       status: "pending",
  //       suggestedActivities: []
  //     }])
  // });



})
