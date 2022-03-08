import { expect } from "chai";
import Traveler from "../src/Traveler";
import travelerTestData from "../src/sample-data/traveler-test-data";


describe("Traveler", () => {

  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {

    traveler1 = new Traveler(travelerTestData[0]);
    traveler2 = new Traveler(travelerTestData[1]);
    traveler3 = new Traveler(travelerTestData[2]);
  });

  it("should be a function", function () {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Traveler", () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
    expect(traveler3).to.be.an.instanceOf(Traveler);
  });

  it("should have an id", () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
    expect(traveler3.id).to.equal(3);
  });

  it("should have a name", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
  });

  it("should have a travelerType", () => {
    expect(traveler1.travelerType).to.equal("relaxer");
  });

  // it("should return the travelers first name", () => {
  //   expect(traveler1.getFirstName()).to.equal("Ham");
  //   expect(traveler2.getFirstName()).to.equal("Rachael");
  // });
});
