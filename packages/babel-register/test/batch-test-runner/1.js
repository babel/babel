import { runParallel } from "../helpers/runner.js";

runParallel(parseInt(import.meta.url.split("/").pop().split(".")[0]), 8);
