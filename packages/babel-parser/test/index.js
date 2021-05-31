import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests";
import { parse } from "../lib";
import { fileURLToPath } from "url";

const fixtures = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "fixtures",
);
runFixtureTests(fixtures, parse);
