import { expect } from "chai";
import Destination from "../src/Destination";
import destinationTestData from "../src/sample-data/destination-test-data";


describe("Destination", () => {

  let destination1;
  let destination2;
  let destination3;

  beforeEach(() => {

    destination1 = new Destination(destinationTestData[0]);
    destination2 = new Destination(destinationTestData[1]);
    destination3 = new Destination(destinationTestData[2]);
  });

  it("should be a function", function () {
    expect(Destination).to.be.a("function");
  });

  it("should be an instance of Destination", () => {
    expect(destination1).to.be.an.instanceOf(Destination);
    expect(destination2).to.be.an.instanceOf(Destination);
    expect(destination3).to.be.an.instanceOf(Destination);
  });

  it("should have an id", () => {
    expect(destination1.id).to.equal(1);
    expect(destination2.id).to.equal(2);
    expect(destination3.id).to.equal(3);
  });

  it("should have a destination", () => {
    expect(destination1.destination).to.equal("Lima, Peru");
  });

  it("should have an estimated lodging cost per day", () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
  });

  it("should have an estimated flight cost per person", () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
  });

  it("should have an image", () => {
    expect(destination1.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it("should have an alt description for the image", () => {
    expect(destination1.alt).to.equal("overview of city buildings with a clear sky");
  });













});
