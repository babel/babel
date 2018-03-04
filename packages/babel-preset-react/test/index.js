import react from "../lib";
import { expect } from "chai";

describe("react preset", () => {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(() => {
      react({ version: "6.5.0" });
    }).to.throw(Error, /Requires Babel "\^7.0.0-0"/);
  });
});
