import { expect } from "chai";
import Traveler from "../src/Traveler";

describe("Traveler", () => {

  let traveler1;
  let traveler2;

  beforeEach(() => {

    traveler1 = new Traveler();
    traveler2 = new Traveler();
  });

  it("should be a function", function () {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Traveler", () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });
