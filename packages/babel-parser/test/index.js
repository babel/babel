import path from "path";
import { runFixtureTests } from "./helpers/runFixtureTests";
import { parse } from "../lib";

runFixtureTests(path.join(__dirname, "fixtures"), parse);
