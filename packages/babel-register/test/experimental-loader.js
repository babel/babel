import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const [major] = process.versions.node.split(".").map(Number);

function runTest(fixture, args, output) {
  const out = spawnSync(
    process.execPath,
    [
      "--experimental-loader",
      pathToFileURL(join(__dirname, "../loader.mjs")),
      ...args,
    ],
    {
      stdio: "pipe",
      env: {
        ...process.env,
        BABEL_REGISTER: join(__dirname, "fixtures", fixture, "register.mjs"),
      },
      cwd: join(__dirname, "fixtures", fixture),
    },
  );

  expect(String(out.stderr).split("\n").slice(2).join("\n")).toEqual("");
  expect(out.error).toBeUndefined();
  expect(out.signal).toBeNull();
  expect(String(out.stdout)).toEqual(output);
}

// skip everything if below version 12
if (major < 12) {
  // eslint-disable-next-line no-global-assign
  it = it.skip;
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
