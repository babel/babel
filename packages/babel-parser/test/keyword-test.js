import { parse } from "../src";

function run(code, options) {
  return parse(code, { sourceType: "module", ...options });
}
describe("keyword test", function () {
  it("switch if keyword", function () {
    expect(
      run("如果 (true) {}", {
        localizedKeywords: {
          if: "如果",
        },
      }),
    ).toMatchSnapshot();
  });
  it("emoji identifier", function () {
    expect(run("var 😁 = 1;", { emoji: true })).toMatchSnapshot();
  });
  it("emoji keyword", function () {
    expect(
      run("😁 (true) {}", {
        localizedKeywords: {
          if: "😁",
        },
      }),
    ).toMatchSnapshot();
  });
});
