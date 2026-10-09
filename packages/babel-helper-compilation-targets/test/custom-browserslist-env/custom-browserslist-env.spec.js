import { fileURLToPath } from "node:url";
import path from "node:path";

import getTargets from "../../lib/index.js";

it("allows custom browserslist env", () => {
  const actual = getTargets(
    {},
    {
      configPath: path.dirname(fileURLToPath(import.meta.url)),
      browserslistEnv: "custom",
    },
  );

  expect(actual).toEqual({ ie: "11.0.0" });
});
