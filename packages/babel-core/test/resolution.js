import * as babel from "../lib/index.js";
import path from "path";
import { fileURLToPath } from "url";

describe("addon resolution", function () {
  const base = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "resolution",
  );
  let cwd;

  beforeEach(function () {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(function () {
    process.chdir(cwd);
  });

  it("should find module: presets", function () {
    process.chdir("module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["module:preset"],
    });
  });

  it("should find module: plugins", function () {
    process.chdir("module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["module:plugin"],
    });
  });

  it("should find standard presets", function () {
    process.chdir("standard-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["mod"],
    });
  });

  it("should find standard plugins", function () {
    process.chdir("standard-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["mod"],
    });
  });

  it("should find standard presets with an existing prefix", function () {
    process.chdir("standard-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["babel-preset-mod"],
    });
  });

  it("should find standard plugins with an existing prefix", function () {
    process.chdir("standard-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["babel-plugin-mod"],
    });
  });

  it("should find @babel scoped presets", function () {
    process.chdir("babel-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/foo"],
    });
  });

  it("should find @babel scoped plugins", function () {
    process.chdir("babel-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/foo"],
    });
  });

  it("should find @babel scoped presets with an existing prefix", function () {
    process.chdir("babel-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/preset-foo"],
    });
  });

  it("should find @babel scoped plugins", function () {
    process.chdir("babel-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/plugin-foo"],
    });
  });

  it("should find @foo scoped presets", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/mod"],
    });
  });

  it("should find @foo scoped plugins", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/mod"],
    });
  });

  it("should find @foo scoped presets with an inner babel-preset", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/thing.babel-preset-convert"],
    });
  });

  it("should find @foo scoped plugins with an inner babel-plugin", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/thing.babel-plugin-convert"],
    });
  });

  it("should find @foo scoped presets with an babel-preset suffix", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/thing-babel-preset"],
    });
  });

  it("should find @foo scoped plugins with an babel-plugin suffix", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/thing-babel-plugin"],
    });
  });

  it("should find @foo scoped presets with an existing prefix", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset-mod"],
    });
  });

  it("should find @foo scoped plugins with an existing prefix", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin-mod"],
    });
  });

  it("should find @foo/babel-plugin when specified", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin"],
    });
  });

  it("should find @foo/babel-preset when specified", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset"],
    });
  });

  it("should find @foo/babel-plugin/index when specified", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin/index"],
    });
  });

  it("should find @foo/babel-preset/index when specified", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset/index"],
    });
  });

  it("should find @foo/babel-plugin when just scope given", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo"],
    });
  });

  it("should find @foo/babel-preset when just scope given", function () {
    process.chdir("foo-org-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo"],
    });
  });

  it("should find relative path presets", function () {
    process.chdir("relative-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["./dir/preset.js"],
    });
  });

  it("should find relative path plugins", function () {
    process.chdir("relative-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["./dir/plugin.js"],
    });
  });

  it("should find module file presets", function () {
    process.chdir("nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["mod/preset"],
    });
  });

  it("should find module file plugins", function () {
    process.chdir("nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["mod/plugin"],
    });
  });

  it("should find @foo scoped module file presets", function () {
    process.chdir("scoped-nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/mod/preset"],
    });
  });

  it("should find @foo scoped module file plugins", function () {
    process.chdir("scoped-nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/mod/plugin"],
    });
  });

  it("should find @babel scoped module file presets", function () {
    process.chdir("babel-scoped-nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/mod/preset"],
    });
  });

  it("should find @babel scoped module file plugins", function () {
    process.chdir("babel-scoped-nested-module-paths");

    babel.transformSync("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/mod/plugin"],
    });
  });

  // TODO(Babel 8): remove node version check.
  it("should throw about module: usage for presets", function () {
    process.chdir("throw-module-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(
      // Todo(Babel 8): remove node checks in this file. We cannot test the desired behaviour
      // because Jest 24 has an issue on setting the MODULE_NOT_FOUND error when the native
      // `require.resolve` is provided.
      // see https://github.com/babel/babel/pull/12439/files#r535996000
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-preset-foo'/
        : /Cannot (?:find|resolve) module 'babel-preset-foo'.*\n- If you want to resolve "foo", use "module:foo"/s,
    );
  });

  it("should throw about module: usage for plugins", function () {
    process.chdir("throw-module-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-plugin-foo'/
        : /Cannot (?:find|resolve) module 'babel-plugin-foo'.*\n- If you want to resolve "foo", use "module:foo"/s,
    );
  });

  it("should throw about @babel usage for presets", function () {
    process.chdir("throw-babel-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-preset-foo'/
        : /Cannot (?:find|resolve) module 'babel-preset-foo'.*\n- Did you mean "@babel\/foo"\?/s,
    );
  });

  it("should throw about @babel usage for plugins", function () {
    process.chdir("throw-babel-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-plugin-foo'/
        : /Cannot (?:find|resolve) module 'babel-plugin-foo'.*\n- Did you mean "@babel\/foo"\?/s,
    );
  });

  it("should throw about passing a preset as a plugin", function () {
    process.chdir("throw-opposite-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["testplugin"],
      });
    }).toThrow(
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-preset-testplugin'/
        : /Cannot (?:find|resolve) module 'babel-preset-testplugin'.*\n- Did you accidentally pass a plugin as a preset\?/s,
    );
  });

  it("should throw about passing a plugin as a preset", function () {
    process.chdir("throw-opposite-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["testpreset"],
      });
    }).toThrow(
      parseInt(process.versions.node, 10) <= 10
        ? /Cannot (?:find|resolve) module 'babel-plugin-testpreset'/
        : /Cannot (?:find|resolve) module 'babel-plugin-testpreset'.*\n- Did you accidentally pass a preset as a plugin\?/s,
    );
  });

  it("should throw about missing presets", function () {
    process.chdir("throw-missing-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(/Cannot (?:find|resolve) module 'babel-preset-foo'/);
  });

  it("should throw about missing plugins", function () {
    process.chdir("throw-missing-paths");

    expect(() => {
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(/Cannot (?:find|resolve) module 'babel-plugin-foo'/);
  });

  const nodeGte12 = parseInt(process.versions.node, 10) >= 12 ? it : it.skip;

  nodeGte12(
    "should suggest -transform- as an alternative to -proposal-",
    function () {
      process.chdir("throw-proposal-to-transform");

      expect(() => {
        babel.transformSync("", {
          filename: "filename.js",
          configFile: false,
          plugins: ["@babel/proposal-halting-functions"],
        });
      }).toThrow(
        /Cannot (?:find|resolve) module '@babel\/plugin-proposal-halting-functions'.*\n- Did you mean "@babel\/plugin-transform-halting-functions"\?/s,
      );
    },
  );
  nodeGte12("should respect package.json#exports", async function () {
    process.chdir("pkg-exports");

    expect(
      babel.transformSync("", {
        filename: "filename.js",
        babelrc: false,
        configFile: false,
        plugins: ["babel-plugin-dual"],
      }).code,
    ).toBe(`"CJS"`);

    expect(
      (
        await babel.transformAsync("", {
          filename: "filename.js",
          babelrc: false,
          configFile: false,
          plugins: ["babel-plugin-dual"],
        })
      ).code,
    ).toBe(`"ESM"`);
  });
});
