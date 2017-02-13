import assert from "assert";
import path from "path";
import buildConfigChain from "../lib/transformation/file/options/build-config-chain";

function fixture() {
  const args = [__dirname, "fixtures", "config"];
  for (let i = 0; i < arguments.length; i ++) {
    args.push(arguments[i]);
  }
  return path.join.apply(path, args);
}

describe("buildConfigChain", function () {
  let oldBabelEnv;
  let oldNodeEnv;

  beforeEach(function () {
    oldBabelEnv = process.env.BABEL_ENV;
    oldNodeEnv = process.env.NODE_ENV;

    delete process.env.BABEL_ENV;
    delete process.env.NODE_ENV;
  });

  afterEach(function () {
    process.env.BABEL_ENV = oldBabelEnv;
    process.env.NODE_ENV = oldNodeEnv;
  });

  it("dir1", function () {
    const chain = buildConfigChain({
      filename: fixture("dir1", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: [
            "extended"
          ]
        },
        alias: fixture("extended.babelrc.json"),
        loc: fixture("extended.babelrc.json"),
        dirname: fixture()
      },
      {
        options: {
          plugins: [
            "root"
          ]
        },
        alias: fixture(".babelrc"),
        loc: fixture(".babelrc"),
        dirname: fixture()
      },
      {
        options: {
          ignore: [
            "root-ignore"
          ]
        },
        alias: fixture(".babelignore"),
        loc: fixture(".babelignore"),
        dirname: fixture()
      },
      {
        options: {
          filename: fixture("dir1", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("dir1")
      }
    ];

    assert.deepEqual(chain, expected);
  });

  it("dir2", function () {
    const chain = buildConfigChain({
      filename: fixture("dir2", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: [
            "dir2"
          ]
        },
        alias: fixture("dir2", ".babelrc"),
        loc: fixture("dir2", ".babelrc"),
        dirname: fixture("dir2")
      },
      {
        options: {
          ignore: [
            "root-ignore"
          ]
        },
        alias: fixture(".babelignore"),
        loc: fixture(".babelignore"),
        dirname: fixture()
      },
      {
        options: {
          filename: fixture("dir2", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("dir2")
      }
    ];

    assert.deepEqual(chain, expected);
  });

  it("env - base", function () {
    const chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: [
            "env-base"
          ]
        },
        alias: fixture("env", ".babelrc"),
        loc: fixture("env", ".babelrc"),
        dirname: fixture("env")
      },
      {
        options: {
          ignore: [
            "root-ignore"
          ]
        },
        alias: fixture(".babelignore"),
        loc: fixture(".babelignore"),
        dirname: fixture()
      },
      {
        options: {
          filename: fixture("env", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("env")
      }
    ];

    assert.deepEqual(chain, expected);
  });

  it("env - foo", function () {
    process.env.NODE_ENV = "foo";

    const chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: [
            "env-base"
          ]
        },
        alias: fixture("env", ".babelrc"),
        loc: fixture("env", ".babelrc"),
        dirname: fixture("env")
      },
      {
        options: {
          plugins: [
            "env-foo"
          ]
        },
        alias: fixture("env", ".babelrc.env.foo"),
        loc: fixture("env", ".babelrc.env.foo"),
        dirname: fixture("env")
      },
      {
        options: {
          ignore: [
            "root-ignore"
          ]
        },
        alias: fixture(".babelignore"),
        loc: fixture(".babelignore"),
        dirname: fixture()
      },
      {
        options: {
          filename: fixture("env", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("env")
      }
    ];

    assert.deepEqual(chain, expected);
  });

  it("env - bar", function () {
    process.env.NODE_ENV = "foo"; // overridden
    process.env.NODE_ENV = "bar";

    const chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: [
            "env-base"
          ]
        },
        alias: fixture("env", ".babelrc"),
        loc: fixture("env", ".babelrc"),
        dirname: fixture("env")
      },
      {
        options: {
          plugins: [
            "env-bar"
          ]
        },
        alias: fixture("env", ".babelrc.env.bar"),
        loc: fixture("env", ".babelrc.env.bar"),
        dirname: fixture("env")
      },
      {
        options: {
          ignore: [
            "root-ignore"
          ]
        },
        alias: fixture(".babelignore"),
        loc: fixture(".babelignore"),
        dirname: fixture()
      },
      {
        options: {
          filename: fixture("env", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("env")
      }
    ];

    assert.deepEqual(chain, expected);
  });


  it("env - foo", function () {
    process.env.NODE_ENV = "foo";

    const chain = buildConfigChain({
      filename: fixture("pkg", "src.js")
    });

    const expected = [
      {
        options: {
          plugins: ["pkg-plugin"]
        },
        alias: fixture("pkg", "package.json"),
        loc: fixture("pkg", "package.json"),
        dirname: fixture("pkg")
      },
      {
        options: {
          ignore: ["pkg-ignore"]
        },
        alias: fixture("pkg", ".babelignore"),
        loc: fixture("pkg", ".babelignore"),
        dirname: fixture("pkg")
      },
      {
        options: {
          filename: fixture("pkg", "src.js")
        },
        alias: "base",
        loc: "base",
        dirname: fixture("pkg")
      }
    ];

    assert.deepEqual(chain, expected);
  });
});
