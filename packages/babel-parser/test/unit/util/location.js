import { getLineInfo } from "../../../src/util/location";

describe("getLineInfo", () => {
  const input = "a\nb\nc\nd\ne\nf\ng\nh\ni";

  it("reports correct position", () => {
    expect(getLineInfo(input, 7)).toEqual({
      column: 1,
      line: 4,
    });
  });

  it("reports correct position for first line", () => {
    expect(getLineInfo(input, 0)).toEqual({
      column: 0,
      line: 1,
    });
  });

  const inputArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const singleCharLineEndings = ["\n", "\r", "\u2028", "\u2029"];

  singleCharLineEndings.forEach(ending => {
    it(`supports ${escape(ending)} line ending`, () => {
      expect(getLineInfo(inputArray.join(ending), 7)).toEqual({
        column: 1,
        line: 4,
      });
    });
  });

  it(`supports ${escape("\r\n")} line ending`, () => {
    expect(getLineInfo(inputArray.join("\r\n"), 7)).toEqual({
      column: 1,
      line: 3,
    });
  });
});
