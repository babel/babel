import path from "path";
import { runFixtureTestsWithoutExactASTMatch } from "./helpers/runFixtureTests";
import { parse } from "../lib";
import { fileURLToPath } from "url";

runFixtureTestsWithoutExactASTMatch(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    options.plugins = options.plugins || [];
    options.plugins.push("estree");
    return parse(input, options);
  },
);
