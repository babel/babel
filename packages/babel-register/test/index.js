import sourceMapSupport from "source-map-support";
import chai from "chai";

const DATA_ES2015 = require.resolve("./__data__/es2015");
const GEN_ERROR = require.resolve("./__data__/gen_error");

xdescribe("@babel/register", function() {
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

  before(() => {
    const js = require("default-require-extensions/js");
    oldCompiler = require.extensions[".js"];
    require.extensions[".js"] = js;
    sourceMapSupport.install({
      emptyCacheBetweenOperations: true,
    });
  });

  after(() => {
    require.extensions[".js"] = oldCompiler;
  });

  afterEach(() => {
    revertRegister();
    delete require.cache[DATA_ES2015];
    delete require.cache[GEN_ERROR];
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
