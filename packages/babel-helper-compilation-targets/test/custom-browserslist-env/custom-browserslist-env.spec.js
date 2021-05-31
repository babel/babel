import getTargets from "../..";
import { fileURLToPath } from "url";
import path from "path";

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
