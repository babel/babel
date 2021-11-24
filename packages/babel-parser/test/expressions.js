import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests.js";
import { parseExpression } from "../lib/index.js";
import { fileURLToPath } from "url";

const fixtures = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "expressions",
);

runFixtureTests(fixtures, parseExpression);
