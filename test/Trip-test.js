import { expect } from "chai";
import Trip from "../src/Trip";
import tripTestData from "../src/sample-data/trip-test-data";
// import dayjs from 'dayjs';

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

  it("should have a userID", () => {
    expect(trip1.userID).to.equal(44);
    expect(trip2.userID).to.equal(35);
  });

  it("should have a destinationID", () => {
    expect(trip1.destinationID).to.equal(49);
    expect(trip2.destinationID).to.equal(25);
  });

  it("should have the number of travelers", () => {
    expect(trip1.travelers).to.equal(1);
    expect(trip2.travelers).to.equal(5);
  });

  it("should have the start date of the trip", () => {
    expect(trip1.date).to.equal("2022/09/16");
    expect(trip2.date).to.equal("2022/10/04");
  });

  it("should have the duration of the trip", () => {
    expect(trip1.duration).to.equal(8);
    expect(trip2.duration).to.equal(18);
  });

  it("should have the status of the trip", () => {
    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("approved");
  });

  it("should have the suggested activities of the trip", () => {
    expect(trip1.suggestedActivities).to.eql([]);
    expect(trip2.suggestedActivities).to.eql([]);
  });

});
