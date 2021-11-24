import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "url";

const fixtures = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "fixtures",
);
runFixtureTests(fixtures, parse);
