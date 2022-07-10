import { fileURLToPath } from "url";
import path from "path";

import _getTargets from "../../lib/index.js";
const getTargets = _getTargets.default || _getTargets;

const oldCwd = process.cwd();

beforeAll(() => {
  process.chdir(path.dirname(fileURLToPath(import.meta.url)));
});

afterAll(() => {
  process.chdir(oldCwd);
});

it("loads packageJson.browserslist", () => {
  const actual = getTargets({}, {});

  expect(actual).toEqual({ chrome: "4.0.0" });
});
