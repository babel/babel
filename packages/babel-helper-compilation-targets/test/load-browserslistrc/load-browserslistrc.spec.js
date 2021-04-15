import getTargets from "../..";
import { fileURLToPath } from "url";
import path from "path";

const oldCwd = process.cwd();

beforeAll(() => {
  process.chdir(path.dirname(fileURLToPath(import.meta.url)));
});

afterAll(() => {
  process.chdir(oldCwd);
});

it("loads browserslistrc", () => {
  const actual = getTargets({}, {});

  expect(actual).toEqual({ chrome: "4.0.0" });
});

it("loads browserslistrc and respects browserslistEnv", () => {
  const actual = getTargets(
    {},
    {
      browserslistEnv: "development",
    },
  );

  expect(actual).toEqual({ chrome: "88.0.0" });
});
