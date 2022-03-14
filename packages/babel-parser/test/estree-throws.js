import path from "path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "url";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    const plugins = options.plugins || [];
    return parse(input, { ...options, plugins: plugins.concat("estree") });
  },
  true,
);
