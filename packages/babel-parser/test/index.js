import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parse } from "../lib/index.js";

runFixtureTests(new URL("./fixtures", import.meta.url), parse);
