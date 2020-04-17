import react from "../lib";

describe("react preset", () => {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(() => {
      react({ version: "6.5.0" });
    }).toThrow(Error, /Requires Babel "\^7.0.0-0"/);
  });
});
