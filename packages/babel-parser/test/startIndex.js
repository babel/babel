import path from "path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "url";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    options.startIndex = 10;
    return parse(input, options);
  },
  false,
  true,
);
