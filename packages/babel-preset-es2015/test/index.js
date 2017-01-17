import es2015 from "../lib";
import { expect } from "chai";

describe("es2015 preset", function () {
  it("exposes an object", function () {
    // Changing this will break compatibility with babel-core < 6.13.x.
    expect(typeof es2015).to.equal("object");
  });

  it("exposes a separate list of plugins", function () {
    expect(Array.isArray(es2015.plugins)).to.equal(true);
  });

  it("doesn't throw with no options passed", function () {
    expect(function () {
      es2015.buildPreset(null);
    }).not.to.throw();
  });

  describe("options", function () {
    describe("loose", function () {
      it("throws on non-boolean value", function () {
        expect(function () {
          es2015.buildPreset(null, { loose: 1 });
        }).to.throw(/must be a boolean/);
      });
    });

    describe("modules", function () {
      it("doesn't throw when passing one false", function () {
        expect(function () {
          es2015.buildPreset(null, { modules: false });
        }).not.to.throw();
      });

      it("doesn't throw when passing one of: 'commonjs', 'amd', 'umd', 'systemjs", function () {
        expect(function () {
          es2015.buildPreset(null, { modules: "commonjs" });
        }).not.to.throw();

        expect(function () {
          es2015.buildPreset(null, { modules: "amd" });
        }).not.to.throw();

        expect(function () {
          es2015.buildPreset(null, { modules: "umd" });
        }).not.to.throw();

        expect(function () {
          es2015.buildPreset(null, { modules: "systemjs" });
        }).not.to.throw();
      });
    });
  });
});
