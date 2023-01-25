import { execFile } from "child_process";
import { createRequire } from "module";
import { outputType } from "./helpers/esm.js";

const require = createRequire(import.meta.url);

async function run(name) {
  return new Promise((res, rej) => {
    execFile(
      process.execPath,
      [require.resolve(`./fixtures/esm-cjs-integration/${name}`)],
      { env: process.env },
      (error, stdout, stderr) => {
        if (error) rej(error);
        res({ stdout: stdout.toString(), stderr: stderr.toString() });
      },
    );
  });
}

(outputType === "module" ? describe : describe.skip)("usage from cjs", () => {
  it("lazy plugin required", async () => {
    expect(await run("lazy-plugin-required.cjs")).toMatchInlineSnapshot(`
      Object {
        "stderr": "",
        "stdout": "\\"Replaced!\\";
      ",
      }
    `);
  });

  it("lazy plugin as config string", async () => {
    expect(await run("lazy-plugin-as-string.cjs")).toMatchInlineSnapshot(`
      Object {
        "stderr": "",
        "stdout": "\\"Replaced!\\";
      ",
      }
    `);
  });

  it("eager plugin required", async () => {
    await expect(run("eager-plugin-required.cjs")).rejects.toThrow(
      "The `types` export of @babel/core is only accessible from" +
        " the CommonJS version after that the ESM version is loaded.",
    );
  });

  it("eager plugin required after dynamic esm import", async () => {
    expect(await run("eager-plugin-required-after-dynamic-esm-import.cjs"))
      .toMatchInlineSnapshot(`
        Object {
          "stderr": "",
          "stdout": "\\"Replaced!\\";
        ",
        }
      `);
  });

  it("eager plugin required after static esm import", async () => {
    expect(await run("eager-plugin-required-after-static-esm-import.mjs"))
      .toMatchInlineSnapshot(`
        Object {
          "stderr": "",
          "stdout": "\\"Replaced!\\";
        ",
        }
      `);
  });

  it("eager plugin as config string", async () => {
    expect(await run("eager-plugin-as-string.cjs")).toMatchInlineSnapshot(`
      Object {
        "stderr": "",
        "stdout": "\\"Replaced!\\";
      ",
      }
    `);
  });

  it("transformSync", async () => {
    await expect(run("transform-sync.cjs")).rejects.toThrow(
      "The `transformSync` export of @babel/core is only callable from" +
        " the CommonJS version after that the ESM version is loaded.",
    );
  });

  it("transformSync after dynamic esm import", async () => {
    expect(await run("transform-sync-after-dynamic-esm-import.cjs"))
      .toMatchInlineSnapshot(`
        Object {
          "stderr": "",
          "stdout": "REPLACE_ME;
        ",
        }
      `);
  });

  it("transformSync after static esm import", async () => {
    expect(await run("transform-sync-after-static-esm-import.mjs"))
      .toMatchInlineSnapshot(`
        Object {
          "stderr": "",
          "stdout": "REPLACE_ME;
        ",
        }
      `);
  });
});
