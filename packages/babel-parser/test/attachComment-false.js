import path from "path";
import { runFixtureTestsWithoutExactASTMatch } from "./helpers/runFixtureTests.js";
import { parseExpression } from "../lib/index.js";
import { fileURLToPath } from "url";

runFixtureTestsWithoutExactASTMatch(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "expressions"),
  (input, options = {}) => {
    options.attachComment = false;
    return parseExpression(input, options);
  },
);
