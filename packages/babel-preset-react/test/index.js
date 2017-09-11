import react from "../lib";
import { expect } from "chai";

describe("react preset", () => {
  it("doesn't throw with no options passed", () => {
    expect(() => {
      react(null);
    }).not.to.throw();
  });

  describe("options", () => {
    describe("development", () => {
      it("throws on non-boolean value", () => {
        expect(function() {
          react(null, { development: 1 });
        }).to.throw(/must be a boolean/);
      });
    });
  });
});
