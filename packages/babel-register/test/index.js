import sourceMapSupport from "source-map-support";
import path from "path";

const DATA_ES2015 = require.resolve("./__data__/es2015");
const GEN_ERROR = require.resolve("./__data__/gen_error");

describe("@babel/register", function() {
  let babelRegister;
  let oldCompiler;

  function setupRegister(config = {}) {
    babelRegister = require("../lib/node");
    babelRegister.default(
      Object.assign(
        {
          plugins: [
            {
              visitor: {
                ImportDeclaration(path) {
                  path.remove();
                },
              },
            },
          ],
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

  beforeAll(() => {
    const js = require("default-require-extensions/js");
    oldCompiler = require.extensions[".js"];
    require.extensions[".js"] = js;
    sourceMapSupport.install({
      emptyCacheBetweenOperations: true,
    });
  });

  afterAll(() => {
    require.extensions[".js"] = oldCompiler;
  });

  afterEach(() => {
    revertRegister();
    delete require.cache[DATA_ES2015];
    delete require.cache[GEN_ERROR];
  });

  it("registers correctly", () => {
    setupRegister();

    expect(require(DATA_ES2015)).toBeTruthy();
  });

  it("reverts correctly", () => {
    setupRegister();

    expect(require(DATA_ES2015)).toBeTruthy();
    delete require.cache[DATA_ES2015];

    revertRegister();

    expect(() => {
      require(DATA_ES2015);
    }).toThrow(SyntaxError);
  });

  it("does not install source map support if asked not to", () => {
    setupRegister({
      sourceMaps: false,
    });

    let gen_error;
    chai.expect((gen_error = require(GEN_ERROR))).to.be.ok;
    chai.expect(gen_error()).to.match(/gen_error\.js:8:34/);
  });

  it("installs source map support by default", () => {
    setupRegister();

    let gen_error;
    chai.expect((gen_error = require(GEN_ERROR))).to.be.ok;
    chai.expect(gen_error()).to.match(/gen_error\.js:2:86/);
  });

  it("installs source map support when requested", () => {
    setupRegister({
      sourceMaps: "both",
    });

    let gen_error;
    chai.expect((gen_error = require(GEN_ERROR))).to.be.ok;
    chai.expect(gen_error()).to.match(/gen_error\.js:2:86/);
  });
});
