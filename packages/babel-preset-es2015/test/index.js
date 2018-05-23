import * as babel from "@babel/core";
import es2015 from "../lib";

function transform(code, opts) {
  return babel.transform(code, {
    cwd: __dirname,
    ...opts,
  });
}

describe("es2015 preset", function() {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(function() {
      es2015({ version: "6.5.0" });
    }).toThrow(Error, /Requires Babel "\^7.0.0-0"/);
  });

  describe("options", function() {
    describe("loose", function() {
      it("throws on non-boolean value", function() {
        expect(function() {
          transform("", { presets: [[es2015, { loose: 1 }]] });
        }).toThrow(/must be a boolean/);
      });
    });

    describe("spec", function() {
      it("throws on non-boolean value", function() {
        expect(function() {
          transform("", { presets: [[es2015, { spec: 1 }]] });
        }).toThrow(/must be a boolean/);
      });
    });

    describe("modules", function() {
      it("doesn't throw when passing one false", function() {
        expect(function() {
          transform("", { presets: [[es2015, { modules: false }]] });
        }).not.toThrow();
      });

      it("doesn't throw when passing one of: 'commonjs', 'amd', 'umd', 'systemjs", function() {
        expect(function() {
          transform("", { presets: [[es2015, { modules: "commonjs" }]] });
        }).not.toThrow();

        expect(function() {
          transform("", { presets: [[es2015, { modules: "amd" }]] });
        }).not.toThrow();

        expect(function() {
          transform("", { presets: [[es2015, { modules: "umd" }]] });
        }).not.toThrow();

        expect(function() {
          transform("", { presets: [[es2015, { modules: "systemjs" }]] });
        }).not.toThrow();
      });

      it("throws when passing neither false nor one of: 'commonjs', 'amd', 'umd', 'systemjs'", function() {
        expect(function() {
          transform("", { presets: [[es2015, { modules: 1 }]] });
        }).toThrow();
      });
    });
  });
});
