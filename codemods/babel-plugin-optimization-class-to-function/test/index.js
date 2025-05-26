import runner from "@babel/helper-plugin-test-runner";
import { commonJS, describeGte } from "$repo-utils";

const { require } = commonJS(import.meta.url);

runner(import.meta.url);

describeGte("22.0.0")("parser", () => {
  it("parse js", () => {
    const parser = require("./fixtures/parser/real-world/output.mjs");
    const parserBaseline = require("@babel/parser");
    expect(parser.parse("1+2")).toEqual(parserBaseline.parse("1+2"));
  });

  it("parse ts", () => {
    const parser = require("./fixtures/parser/real-world/output.mjs");
    const parserBaseline = require("@babel/parser");
    expect(parser.parse("type a = 1", { plugins: ["typescript"] })).toEqual(
      parserBaseline.parse("type a = 1", { plugins: ["typescript"] }),
    );
  });
});
