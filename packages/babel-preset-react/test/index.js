import react from "../lib";
import { expect } from "chai";

describe("react preset", () => {
  it("doesn't throw with no options passed", () => {
    expect(() => {
      react(null);
    }).not.to.throw();
  });
});
