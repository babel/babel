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
});
