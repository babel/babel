import { fileURLToPath } from "url";
import path from "path";

import _getTargets from "../../lib/index.js";
const getTargets = _getTargets.default || _getTargets;

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
