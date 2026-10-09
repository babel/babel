import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parseExpression } from "../lib/index.js";

runFixtureTests(new URL("./expressions", import.meta.url), parseExpression);
