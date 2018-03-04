import * as babel from "@babel/core";
import es2015 from "../lib";
import { expect } from "chai";

describe("es2015 preset", function() {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(function() {
      es2015({ version: "6.5.0" });
    }).to.throw(Error, /Requires Babel "\^7.0.0-0"/);
  });

  describe("options", function() {
    describe("loose", function() {
      it("throws on non-boolean value", function() {
        expect(function() {
          babel.transform("", { presets: [[es2015, { loose: 1 }]] });
        }).to.throw(/must be a boolean/);
      });
    });

    describe("spec", function() {
      it("throws on non-boolean value", function() {
        expect(function() {
          babel.transform("", { presets: [[es2015, { spec: 1 }]] });
        }).to.throw(/must be a boolean/);
      });
    });

    describe("modules", function() {
      it("doesn't throw when passing one false", function() {
        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: false }]] });
        }).not.to.throw();
      });

      it("doesn't throw when passing one of: 'commonjs', 'amd', 'umd', 'systemjs", function() {
        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: "commonjs" }]] });
        }).not.to.throw();

        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: "amd" }]] });
        }).not.to.throw();

        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: "umd" }]] });
        }).not.to.throw();

        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: "systemjs" }]] });
        }).not.to.throw();
      });

      it("throws when passing neither false nor one of: 'commonjs', 'amd', 'umd', 'systemjs'", function() {
        expect(function() {
          babel.transform("", { presets: [[es2015, { modules: 1 }]] });
        }).to.throw();
      });
    });
  });
});
