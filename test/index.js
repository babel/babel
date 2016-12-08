import path from "path";
import runFixtureTests from "./utils/runFixtureTests";
import { parse } from "../lib";

runFixtureTests(path.join(__dirname, "fixtures"), parse);
