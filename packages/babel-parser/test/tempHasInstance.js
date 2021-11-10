import { parse } from "../lib";

function getParser(code) {
  return () => parse(code, { sourceType: "module" });
}

const testCode = `
class Range {
    #start
    #end
    constructor(start, end) {
        this.#start = start
        this.#end = end
    }
    test(){
    }
    equals(range) {
        // this.test(range);
        call(range)
        if (!(class.hasInstance(range))) return false
        // return this.#start === range.#start && this.#end === range.#end
    }
}
`;

describe("class function syntax", () => {
  it("should parse", () => {
    expect(getParser(testCode)()).toMatchSnapshot();
  });
});
