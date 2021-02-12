import path from "path";
import { runThrowTestsWithEstree } from "./helpers/runFixtureTests";
import { parse } from "../lib";
import { fileURLToPath } from "url";

runThrowTestsWithEstree(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  parse,
);
