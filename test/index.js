import path from "path";
import runFixtureTests from "./utils/runFixtureTests";
import { parse, parseExpression } from "../lib";

runFixtureTests(path.join(__dirname, "fixtures"), parse);
runFixtureTests(path.join(__dirname, "expressions"), parseExpression);
