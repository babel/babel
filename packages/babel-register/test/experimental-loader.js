import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function runTest(fixture, args, output) {
  const out = spawnSync(
    "node",
    ["--experimental-loader", join(__dirname, "..", "loader.mjs"), ...args],
    {
      env: {
        ...process.env,
        BABEL_REGISTER: join(__dirname, "fixtures", fixture, "register.mjs"),
      },
      stdio: ["pipe", "pipe", "inherit"],
      cwd: join(__dirname, "fixtures", fixture),
    },
  );

  expect(out.error).toBeUndefined();
  expect(out.signal).toBeNull();
  expect(String(out.output[1])).toEqual(output);
}

describe("experimental-loader", () => {
  it("should run a typescript binary", () => {
    runTest("experimental-loader", ["src/bin.ts", "Babel"], "Hello Babel\n");
  });

  it("should not interfere with cjs", () => {
    runTest(
      "experimental-loader-cjs",
      ["src/bin.ts", "Babel"],
      "Hello Babel\n",
    );
  });
});
