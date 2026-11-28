import { transformSync } from "@babel/core";
import syntaxPipelineOperator from "../lib/index.js";

function transform(code, options) {
  return transformSync(code, {
    babelrc: false,
    configFile: false,
    plugins: [[syntaxPipelineOperator, options]],
  }).code;
}

describe("generator options", function () {
  test("F# pipes are not printed as Hack pipes with a 'topicToken' option", function () {
    // F# pipes are left-associative, while the body of a Hack pipe is an
    // assignment expression
    expect(
      transform("a |> (f |> g);", { proposal: "fsharp", topicToken: "%" }),
    ).toBe("a |> (f |> g);");
  });

  test("Hack pipes are printed with the 'topicToken' option", function () {
    expect(
      transform("(a |> %) ? b : c;", { proposal: "hack", topicToken: "%" }),
    ).toBe("(a |> %) ? b : c;");
  });
});
