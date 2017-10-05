import chai from "chai";
import path from "path";

const DATA_ES2015 = require.resolve("./__data__/es2015");

xdescribe("babel-register", function() {
  let babelRegister;
  let oldCompiler;

  function setupRegister(config = {}) {
    babelRegister = require("../lib/node");
    babelRegister.default(
      Object.assign(
        {
          presets: [path.join(__dirname, "../../babel-preset-es2015")],
          babelrc: false,
        },
        config,
      ),
    );
  }

  function revertRegister() {
    if (babelRegister) {
      babelRegister.revert();
      babelRegister = null;
    }
  }

  before(() => {
    const js = require("default-require-extensions/js");
    oldCompiler = require.extensions[".js"];
    require.extensions[".js"] = js;
  });

  after(() => {
    require.extensions[".js"] = oldCompiler;
  });

  afterEach(() => {
    revertRegister();
    delete require.cache[DATA_ES2015];
  });

  it("registers correctly", () => {
    setupRegister();

    chai.expect(require(DATA_ES2015)).to.be.ok;
  });

  it("reverts correctly", () => {
    setupRegister();

    chai.expect(require(DATA_ES2015)).to.be.ok;
    delete require.cache[DATA_ES2015];

    revertRegister();

    chai
      .expect(() => {
        require(DATA_ES2015);
      })
      .to.throw(SyntaxError);
  });
});
