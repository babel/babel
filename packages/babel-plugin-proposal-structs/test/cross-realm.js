import { transformSync } from "@babel/core";
import vm from "node:vm";
import plugin from "../lib/index.js";

function run(code, context, options = {}) {
  const { code: output } = transformSync(code, {
    configFile: false,
    babelrc: false,
    sourceType: "script",
    ...options,
    plugins: [plugin, ...(options.plugins || [])],
  });
  return vm.runInContext(output, context);
}

// Runs each file in its own function scope, so that the top-level helpers of
// files evaluated in the same realm do not collide
function runIsolated(code, result, context, options) {
  return run(
    `(function () { ${code}; return ${result}; })();`,
    context,
    options,
  );
}

describe("structs from other realms", () => {
  it("can be extended", () => {
    const realmA = vm.createContext({});
    const realmB = vm.createContext({});

    realmB.Base = run(
      `
      struct Base {
        x = 1;
        y;
        #p = 2;
        constructor(y) {
          this.y = y;
        }
        getP() {
          return this.#p;
        }
      }
      class NotStruct {}
      globalThis.NotStruct = NotStruct;
      Base;
      `,
      realmA,
    );
    realmB.NotStruct = realmA.NotStruct;

    const result = run(
      `
      struct D extends Base {
        z = 3;
        constructor(y) {
          super(y * 2);
        }
      }
      const d = new D(5);
      let notStructError;
      try {
        struct E extends NotStruct {}
      } catch (e) {
        notStructError = e;
      }
      ({
        d,
        keys: Object.keys(d),
        sealed: Object.isSealed(d),
        p: d.getP(),
        isBase: d instanceof Base,
        base: new Base(7),
        notStructError,
      });
      `,
      realmB,
    );

    expect(result.keys).toEqual(["x", "y", "z"]);
    expect(result.d.y).toBe(10);
    expect(result.sealed).toBe(true);
    expect(result.p).toBe(2);
    expect(result.isBase).toBe(true);
    expect(result.base.y).toBe(7);
    // The brand check of the methods from the other realm accepts instances
    // of derived structs
    expect(realmB.Base.prototype.getP.call(result.d)).toBe(2);
    expect(() => realmB.Base.prototype.getP.call({})).toThrow();
    expect(result.notStructError.constructor.name).toBe("TypeError");
    expect(result.notStructError.message).toBe(
      "Structs can only extend other structs or null",
    );
  });

  it.each(["AAA", "ABA", "ABB", "ABC"])(
    "can be extended through a chain across realms (%s)",
    realms => {
      const contexts = {};
      for (const name of realms) contexts[name] ??= vm.createContext({});
      const [a, b, c] = Array.from(realms, name => contexts[name]);

      b.SA = runIsolated(
        "struct SA { a = 1; getA() { return this.a; } }",
        "SA",
        a,
      );
      c.SB = runIsolated("struct SB extends SA { b = 2; }", "SB", b);
      const result = runIsolated(
        "struct SC extends SB { c = 3; }",
        "(o => [Object.keys(o), o.getA(), Object.isSealed(o)])(new SC())",
        c,
      );
      expect(result).toEqual([["a", "b", "c"], 1, true]);
    },
  );

  it("can be constructed while constructing a struct from another realm", () => {
    const realmA = vm.createContext({});
    const realmB = vm.createContext({});
    // With setPublicClassFields, declaring the field calls the setter
    const options = {
      plugins: [
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-private-methods",
        "@babel/plugin-transform-class-static-block",
      ],
      assumptions: { setPublicClassFields: true },
    };

    realmB.Base = runIsolated("struct Base { b = 1; }", "Base", realmA);
    const result = runIsolated(
      `
      let nested = false, inner;
      struct D extends Base {
        x;
        set x(v) {
          if (!nested) {
            nested = true;
            inner = new D();
          }
        }
      }
      `,
      "[new D(), inner]",
      realmB,
      options,
    );
    expect(result[1]).not.toBe(result[0]);
    expect(Object.keys(result[1])).toEqual(["b"]);
  });

  it("are recognized regardless of their source text and static members", () => {
    const realmA = vm.createContext({});
    const realmB = vm.createContext({});

    realmB.Bases = runIsolated(
      `
      var calls = 0;
      struct Comment {
        m() { return 1; } // [native code]
      }
      struct Getter {
        static get [Symbol.for("babel.structs@1")]() {
          calls++;
          return 42;
        }
      }
      // Its own data property is non-writable and non-configurable, like the
      // registry on the base functions
      struct Frozen {
        static [Symbol.for("babel.structs@1")] = 42;
        x = 1;
      }
      Object.freeze(Frozen);
      class NotStruct {
        static [Symbol.for("babel.structs@1")] = 42;
      }
      Object.freeze(NotStruct);
      class NotStructGetter {
        static [Symbol.for("babel.structs@1")] = {
          get s() {
            calls++;
          },
        };
      }
      Object.freeze(NotStructGetter);
      `,
      "{ Comment, Getter, Frozen, NotStruct, NotStructGetter, calls: () => calls }",
      realmA,
    );
    const result = runIsolated(
      `
      struct D1 extends Bases.Comment {}
      struct D2 extends Bases.Getter {}
      struct D3 extends Bases.Frozen {}
      let errors = [];
      try {
        struct D4 extends Bases.NotStruct {}
      } catch (e) {
        errors.push(e.message);
      }
      try {
        struct D5 extends Bases.NotStructGetter {}
      } catch (e) {
        errors.push(e.message);
      }
      `,
      "[new D1().m(), new D2() instanceof Bases.Getter, new D3().x, errors]",
      realmB,
    );
    expect(result).toEqual([
      1,
      true,
      1,
      [
        "Structs can only extend other structs or null",
        "Structs can only extend other structs or null",
      ],
    ]);
    expect(realmB.Bases.calls()).toBe(0);
  });
});
