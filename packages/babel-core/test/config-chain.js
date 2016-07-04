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

suite("evaluation", function () {
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
});
