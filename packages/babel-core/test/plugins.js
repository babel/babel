import runner from "@babel/helper-transform-fixture-test-runner";
import { fileURLToPath } from "node:url";
import path from "node:path";

(runner.default || runner)(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures/plugins"),
  "plugins",
);
