import path from "path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parseExpression } from "../lib/index.js";
import { fileURLToPath } from "url";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "expressions"),
  (input, options = {}) => {
    options.attachComment = false;
    return parseExpression(input, options);
  },
  true,
);
