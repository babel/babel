import { fileURLToPath } from "node:url";
import path from "node:path";

import getTargets from "../../lib/index.js";

const oldCwd = process.cwd();

beforeAll(() => {
  process.chdir(path.dirname(fileURLToPath(import.meta.url)));
});

after all(() => {
  process.chdir(oldCwd);
});

it("loads packageJson.browserslist", () => {
  const actual = getTargets({}, {});

  expect(actual).toEqual({ chrome: "4.0.0" });
});
