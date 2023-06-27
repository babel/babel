import runner from "@babel/helper-plugin-test-runner";
import { execSync } from "child_process";

describe("preset-env", () => {
  // todo: remove temporary resolution when @babel/helper-define-polyfill-provider bumps
  // @babel/helper-compilation-targets to the latest version
  beforeAll(() => {
    execSync(
      "yarn set resolution '@babel/helper-compilation-targets@npm:^7.17.7' 'workspace:*'",
    );
  });
  afterAll(() => {
    execSync(
      "yarn set resolution '@babel/helper-compilation-targets@npm:^7.17.7' '7.22.5'",
    );
  });
  runner(import.meta.url);
});
