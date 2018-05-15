import path from "path";
import { runThrowTestsWithEstree } from "./helpers/runFixtureTests";
import { parse } from "../lib";

runThrowTestsWithEstree(path.join(__dirname, "fixtures"), parse);
