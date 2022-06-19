import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import _getTargets from "../../lib/index.js";
const getTargets = _getTargets.default || _getTargets;

const currentDir = dirname(fileURLToPath(import.meta.url));

const oldEnv = process.env.BROWSERSLIST_DANGEROUS_EXTEND;

beforeAll(() => {
  process.env.BROWSERSLIST_DANGEROUS_EXTEND = true;
});

afterAll(() => {
  process.env.BROWSERSLIST_DANGEROUS_EXTEND = oldEnv;
});

it("pass env to configs used with extends", async () => {
  const actual = getTargets(
    {
      browsers: [
        `extends ${resolve(
          currentDir,
          "fixtures",
          "@babel",
          "browserslist-config-fixture.cjs",
        )}`,
        "chrome >= 71",
      ],
    },
    {
      configPath: currentDir,
      browserslistEnv: "custom",
    },
  );

  expect(actual).toEqual({ chrome: "71.0.0", firefox: "75.0.0" });
});
