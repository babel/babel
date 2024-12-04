import { execFile } from "child_process";
import { createRequire } from "module";
import { describeESM, describeGte, itLt } from "$repo-utils";

const require = createRequire(import.meta.url);

// "minNodeVersion": "22.0.0" <-- For Ctrl+F when dropping node 20
const nodeLt22_12 = itLt("22.12.0");

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

describeESM("usage from cjs", () => {
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

describeESM("sync loading of ESM plugins", () => {
  nodeLt22_12("without --experimental-require-module flag", async () => {
    await expect(run("transform-sync-esm-plugin.mjs")).rejects.toThrow(
      "You appear to be using a native ECMAScript module plugin, which is " +
        "only supported when running Babel asynchronously or when using the " +
        "Node.js `--experimental-require-module` flag.",
    );
  });

  describeGte("22.12.0")("without --experimental-require-module flag", () => {
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

  describeGte("20.0.0")("with --experimental-require-module flag", () => {
    it("sync with --experimental-require-module flag", async () => {
      const { stdout } = await run(
        "transform-sync-esm-plugin.mjs",
        "--experimental-require-module",
      );
      expect(stdout).toMatchInlineSnapshot(`
        "\\"Replaced!\\";
        "
      `);
    });

    it("top-level await with --experimental-require-module flag", async () => {
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
