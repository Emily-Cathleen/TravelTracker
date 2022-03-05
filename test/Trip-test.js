import { expect } from "chai";
import Trip from "../src/Trip";
import tripTestData from "../src/sample-data/trip-test-data";


describe("Trip", () => {

  let trip1;
  let trip2;
  let trip3;

  beforeEach(() => {

    trip1 = new Trip(tripTestData[0]);
    trip2 = new Trip(tripTestData[1]);
    trip3 = new Trip(tripTestData[2]);
  });

  it("should be a function", function () {
    expect(Trip).to.be.a("function");
  });

  it("should be an instance of Trip", () => {
    expect(trip1).to.be.an.instanceOf(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
    expect(trip3).to.be.an.instanceOf(Trip);
  });

  it("should have an id", () => {
    expect(trip1.id).to.equal(1);
    expect(trip2.id).to.equal(2);
    expect(trip3.id).to.equal(3);
  });

  it("should have a name", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
  });

  it("should have a travelerType", () => {
    expect(traveler1.travelerType).to.equal("relaxer");
  });

  it("should return the travelers first name", () => {
    expect(traveler1.getFirstName()).to.equal("Ham");
    expect(user2.getFirstName()).to.equal("Rachael");
  });
});



  });
