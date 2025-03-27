import path from "node:path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parseExpression } from "../lib/index.js";
import { fileURLToPath } from "node:url";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "expressions"),
  (input, options = {}) => {
    options.attachComment = false;
    return parseExpression(input, options);
  },
  true,
);
