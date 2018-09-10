import * as babel from "../lib/index";
import path from "path";

describe("addon resolution", function() {
  const base = path.join(__dirname, "fixtures", "resolution");
  let cwd;

  beforeEach(function() {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(function() {
    process.chdir(cwd);
  });

  it("should find module: presets", function() {
    process.chdir("module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["module:preset"],
    });
  });

  it("should find module: plugins", function() {
    process.chdir("module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["module:plugin"],
    });
  });

  it("should find standard presets", function() {
    process.chdir("standard-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["mod"],
    });
  });

  it("should find standard plugins", function() {
    process.chdir("standard-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["mod"],
    });
  });

  it("should find standard presets with an existing prefix", function() {
    process.chdir("standard-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["babel-preset-mod"],
    });
  });

  it("should find standard plugins with an existing prefix", function() {
    process.chdir("standard-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["babel-plugin-mod"],
    });
  });

  it("should find @babel scoped presets", function() {
    process.chdir("babel-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/foo"],
    });
  });

  it("should find @babel scoped plugins", function() {
    process.chdir("babel-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/foo"],
    });
  });

  it("should find @babel scoped presets with an existing prefix", function() {
    process.chdir("babel-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/preset-foo"],
    });
  });

  it("should find @babel scoped plugins", function() {
    process.chdir("babel-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/plugin-foo"],
    });
  });

  it("should find @foo scoped presets", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/mod"],
    });
  });

  it("should find @foo scoped plugins", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/mod"],
    });
  });

  it("should find @foo scoped presets with an inner babel-preset", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/thing.babel-preset-convert"],
    });
  });

  it("should find @foo scoped plugins with an inner babel-plugin", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/thing.babel-plugin-convert"],
    });
  });

  it("should find @foo scoped presets with an babel-preset suffix", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/thing-babel-preset"],
    });
  });

  it("should find @foo scoped plugins with an babel-plugin suffix", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/thing-babel-plugin"],
    });
  });

  it("should find @foo scoped presets with an existing prefix", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset-mod"],
    });
  });

  it("should find @foo scoped plugins with an existing prefix", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin-mod"],
    });
  });

  it("should find @foo/babel-plugin when specified", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin"],
    });
  });

  it("should find @foo/babel-preset when specified", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset"],
    });
  });

  it("should find @foo/babel-plugin/index when specified", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/babel-plugin/index"],
    });
  });

  it("should find @foo/babel-preset/index when specified", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/babel-preset/index"],
    });
  });

  it("should find @foo/babel-plugin when just scope given", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo"],
    });
  });

  it("should find @foo/babel-preset when just scope given", function() {
    process.chdir("foo-org-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo"],
    });
  });

  it("should find relative path presets", function() {
    process.chdir("relative-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["./dir/preset.js"],
    });
  });

  it("should find relative path plugins", function() {
    process.chdir("relative-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["./dir/plugin.js"],
    });
  });

  it("should find module file presets", function() {
    process.chdir("nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["mod/preset"],
    });
  });

  it("should find module file plugins", function() {
    process.chdir("nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["mod/plugin"],
    });
  });

  it("should find @foo scoped module file presets", function() {
    process.chdir("scoped-nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@foo/mod/preset"],
    });
  });

  it("should find @foo scoped module file plugins", function() {
    process.chdir("scoped-nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@foo/mod/plugin"],
    });
  });

  it("should find @babel scoped module file presets", function() {
    process.chdir("babel-scoped-nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      presets: ["@babel/mod/preset"],
    });
  });

  it("should find @babel scoped module file plugins", function() {
    process.chdir("babel-scoped-nested-module-paths");

    babel.transform("", {
      filename: "filename.js",
      babelrc: false,
      plugins: ["@babel/mod/plugin"],
    });
  });

  it("should throw about module: usage for presets", function() {
    process.chdir("throw-module-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(
      /Cannot find module 'babel-preset-foo'.*\n- If you want to resolve "foo", use "module:foo"/,
    );
  });

  it("should throw about module: usage for plugins", function() {
    process.chdir("throw-module-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(
      /Cannot find module 'babel-plugin-foo'.*\n- If you want to resolve "foo", use "module:foo"/,
    );
  });

  it("should throw about @babel usage for presets", function() {
    process.chdir("throw-babel-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(
      /Cannot find module 'babel-preset-foo'.*\n- Did you mean "@babel\/foo"\?/,
    );
  });

  it("should throw about @babel usage for plugins", function() {
    process.chdir("throw-babel-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(
      /Cannot find module 'babel-plugin-foo'.*\n- Did you mean "@babel\/foo"\?/,
    );
  });

  it("should throw about passing a preset as a plugin", function() {
    process.chdir("throw-opposite-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["testplugin"],
      });
    }).toThrow(
      /Cannot find module 'babel-preset-testplugin'.*\n- Did you accidentally pass a preset as a plugin\?/,
    );
  });

  it("should throw about passing a plugin as a preset", function() {
    process.chdir("throw-opposite-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["testpreset"],
      });
    }).toThrow(
      /Cannot find module 'babel-plugin-testpreset'.*\n- Did you accidentally pass a plugin as a preset\?/,
    );
  });

  it("should throw about missing presets", function() {
    process.chdir("throw-missing-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        presets: ["foo"],
      });
    }).toThrow(/Cannot find module 'babel-preset-foo'/);
  });

  it("should throw about missing plugins", function() {
    process.chdir("throw-missing-paths");

    expect(() => {
      babel.transform("", {
        filename: "filename.js",
        babelrc: false,
        plugins: ["foo"],
      });
    }).toThrow(/Cannot find module 'babel-plugin-foo'/);
  });
});
