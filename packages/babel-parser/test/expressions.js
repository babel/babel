import path from "node:path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parseExpression } from "../lib/index.js";
import { fileURLToPath } from "node:url";

const fixtures = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "expressions",
);

runFixtureTests(fixtures, parseExpression);
