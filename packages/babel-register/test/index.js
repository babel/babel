import assert from "assert";
import path from "path";
import decache from "decache";

const DATA_ES2015 = require.resolve("./__data__/es2015");

describe("babel-register", function () {
  let babelRegister = null;

  function setupRegister(config) {
    babelRegister = require("../lib/node");
    babelRegister.default(Object.assign({
      presets: [path.join(__dirname, "../../babel-preset-es2015")],
      babelrc: false,
      only: ["__data__"],
    }, config));
  }

  function revertRegister() {
    if (babelRegister) {
      babelRegister.revert();
      babelRegister = null;
    }
  }

  afterEach(() => {
    revertRegister();
    decache(DATA_ES2015);
  });

  it("basic usage", function () {
    setupRegister();

    assert.ok(require(DATA_ES2015).default);
  });

  it("reverts correctly", () => {
    setupRegister();
    revertRegister();

    assert.throws(function () {
      require(DATA_ES2015);
    }, SyntaxError);
  });
});
