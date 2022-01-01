import path from "path";
import { runFixtureTestsWithoutExactASTMatch } from "./helpers/runFixtureTests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "url";

runFixtureTestsWithoutExactASTMatch(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    const plugins = options.plugins || [];
    return parse(input, { ...options, plugins: plugins.concat("estree") });
  },
);
