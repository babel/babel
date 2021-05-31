import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests";
import { parseExpression } from "../lib";
import { fileURLToPath } from "url";

const fixtures = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "expressions",
);

runFixtureTests(fixtures, parseExpression);
