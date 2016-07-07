var assert = require("assert");
var path = require("path");
var buildConfigChain = require("../lib/transformation/file/options/build-config-chain");

function fixture() {
  var args = [__dirname, "fixtures", "config"];
  for (var i = 0; i < arguments.length; i ++) {
    args.push(arguments[i]);
  }
  return path.join.apply(path, args);
}

suite("buildConfigChain", function () {
  var oldBabelEnv;
  var oldNodeEnv;

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

  test("dir1", function () {
    var chain = buildConfigChain({
      filename: fixture("dir1", "src.js")
    });

    var expected = [
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

  test("dir2", function () {
    var chain = buildConfigChain({
      filename: fixture("dir2", "src.js")
    });

    var expected = [
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

  test("env - base", function () {
    var chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    var expected = [
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

  test("env - foo", function () {
    process.env.NODE_ENV = "foo";
    
    var chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    var expected = [
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
  
  test("env - bar", function () {
    process.env.NODE_ENV = "foo"; // overridden
    process.env.NODE_ENV = "bar";
    
    var chain = buildConfigChain({
      filename: fixture("env", "src.js")
    });

    var expected = [
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
});
