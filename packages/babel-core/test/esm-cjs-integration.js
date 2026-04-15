import { execFile } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

async function run(name, ...flags) {
  return new Promise((res, rej) => {
    execFile(
      process.execPath,
      [...flags, require.resolve(`./fixtures/esm-cjs-integration/${name}`)],
      { env: process.env },
      (error, stdout, stderr) => {
        if (error) rej(error);
        res({ stdout: stdout.toString(), stderr: stderr.toString() });
      },
    );
  });
}

describe("dummy", () => {
  it("dummy", () => {});
});

describe("usage from cjs", () => {
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
    expect(await run("eager-plugin-required.cjs")).toMatchInlineSnapshot(`
      Object {
        "stderr": "",
        "stdout": "\\"Replaced!\\";
      ",
      }
    `);
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
    expect(await run("transform-sync.cjs")).toMatchInlineSnapshot(`
      Object {
        "stderr": "",
        "stdout": "REPLACE_ME;
      ",
      }
    `);
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

describe("sync loading of ESM plugins", () => {
  describe("without --experimental-require-module flag", () => {
    it("sync", async () => {
      const { stdout } = await run(
        "transform-sync-esm-plugin.mjs",
        "--experimental-require-module",
      );
      expect(stdout).toMatchInlineSnapshot(`
            "\\"Replaced!\\";
            "
        `);
    });

    it("top-level await", async () => {
      await expect(
        run(
          "transform-sync-esm-plugin-tla.mjs",
          "--experimental-require-module",
        ),
      ).rejects.toThrow(
        "You appear to be using a plugin that contains top-level await, " +
          "which is only supported when running Babel asynchronously.",
      );
    });
  });
});
