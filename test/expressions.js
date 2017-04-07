import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests";
import { parseExpression } from "../lib";

runFixtureTests(path.join(__dirname, "expressions"), parseExpression);
