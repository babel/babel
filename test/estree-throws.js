import path from "path";
import { runThrowTestsWithEstree } from "./utils/runFixtureTests";
import { parse } from "../lib";

runThrowTestsWithEstree(path.join(__dirname, "fixtures"), parse);
