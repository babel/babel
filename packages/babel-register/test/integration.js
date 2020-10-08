import { exec as execCb } from "child_process";

// TODO(Babel 8): Use util.promisify(execCb)
const exec = (...args) =>
  new Promise((resolve, reject) => {
    execCb(...args, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve({ stdout, stderr });
    });
  });

function fixture(name, file = "index.js") {
  const cwd = `${__dirname}/fixtures/integration/${name}`;
  return exec(`node -r ${__dirname}/.. ${cwd}/${file}`, {
    cwd,
    env: { ...process.env, BABEL_DISABLE_CACHE: true },
  });
}

describe("integration tests", function () {
  it("can hook into extensions defined by the config", async () => {
    const { stdout, stderr } = await fixture("load-ts");

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/load-ts/index.js\\"
      LOADED: \\"<ROOT>/load-ts/foo.ts\\"
      DONE: foo.ts
      DONE: index.js
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });

  it("does not hook into unknown extensions", async () => {
    const { stdout, stderr } = await fixture("no-load-ts");

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/no-load-ts/index.js\\"
      DONE: foo.ts
      DONE: index.js
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });

  it("hooks into the default extensions", async () => {
    const { stdout, stderr } = await fixture("default-extensions");

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/default-extensions/index.js\\"
      LOADED: \\"<ROOT>/default-extensions/foo.jsx\\"
      DONE: foo.jsx
      LOADED: \\"<ROOT>/default-extensions/foo.es6\\"
      DONE: foo.es6
      LOADED: \\"<ROOT>/default-extensions/foo.es\\"
      DONE: foo.es
      LOADED: \\"<ROOT>/default-extensions/foo.mjs\\"
      DONE: foo.mjs
      DONE: foo.ts
      DONE: foo.tsx
      DONE: foo.cjs
      DONE: index.js
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });

  it("node resolves extensions that it gets from the Babel config", async () => {
    const { stdout, stderr } = await fixture("resolve-extension-from-config");

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/resolve-extension-from-config/index.js\\"
      LOADED: \\"<ROOT>/resolve-extension-from-config/foo.ts\\"
      DONE: foo.ts
      DONE: index.js
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });

  it("node resolves extensions that it gets from the main file", async () => {
    const { stdout, stderr } = await fixture(
      "resolve-extension-from-main-file",
      "index.ts",
    );

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/resolve-extension-from-main-file/index.ts\\"
      LOADED: \\"<ROOT>/resolve-extension-from-main-file/foo.ts\\"
      DONE: foo.ts
      DONE: index.ts
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });

  it("node resolves extensions that it gets from a required file", async () => {
    const { stdout, stderr } = await fixture(
      "resolve-extension-from-required-file",
    );

    expect(stdout).toMatchInlineSnapshot(`
      "LOADED: \\"<ROOT>/resolve-extension-from-required-file/index.js\\"
      LOADED: \\"<ROOT>/resolve-extension-from-required-file/foo.ts\\"
      LOADED: \\"<ROOT>/resolve-extension-from-required-file/bar.ts\\"
      DONE: bar.ts
      DONE: foo.ts
      DONE: index.js
      "
    `);
    expect(stderr).toMatchInlineSnapshot(`""`);
  });
});
