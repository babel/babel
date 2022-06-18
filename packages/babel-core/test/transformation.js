import runner from "@babel/helper-transform-fixture-test-runner";
import { fileURLToPath } from "url";
import path from "path";

(runner.default || runner)(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "/fixtures/transformation",
  ),
  "transformation",
);
