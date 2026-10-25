import { transformSync, traverse } from "@babel/core";
import {
  createDestructuringPlugin,
  FEATURES,
} from "@babel/helper-create-destructuring-plugin";
import transformClassProperties from "@babel/plugin-transform-class-properties";

function plugin(feature, older = false) {
  return api => {
    const result = createDestructuringPlugin({
      name: `test-destructuring-${feature}`,
      api,
      feature,
      manipulateOptions(_, parserOpts) {
        if (feature & FEATURES.privateDestructuring) {
          parserOpts.plugins.push("destructuringPrivate");
        }
      },
    });
    // Older helper copies still enable their features in `pre`, but the
    // version guard disables their visitors.
    if (older) result.visitor = {};
    return result;
  };
}

function transform(input, plugins) {
  return transformSync(input, {
    babelrc: false,
    configFile: false,
    sourceType: "script",
    parserOpts: { allowReturnOutsideFunction: true },
    ast: true,
    plugins,
  });
}

const restSpread = FEATURES.objectRest | FEATURES.objectSpread;

describe.each([false, true])("shared helper (reverse order: %s)", reverse => {
  function plugins(currentFeature, olderFeature) {
    const plugins = [plugin(currentFeature), plugin(olderFeature, true)];
    return reverse ? plugins.reverse() : plugins;
  }

  it.each([
    [FEATURES.destructuring, restSpread],
    [FEATURES.privateDestructuring, restSpread],
    [restSpread, FEATURES.destructuring],
  ])(
    "lowers all enabled features with owner %s and older %s",
    (owner, older) => {
      const { ast, code } = transform(
        `
        var a = { x: 1, z: 2 };
        var o = { ...a };
        function f({ ...rest }) { return rest; }
        var { x, ...y } = o;
        return [f(o), x, y];
      `,
        plugins(owner, older),
      );
      traverse(ast, {
        SpreadElement(path) {
          expect(path.parent.type).not.toBe("ObjectExpression");
        },
        RestElement(path) {
          expect(path.parent.type).not.toBe("ObjectPattern");
        },
      });
      expect(new Function(code)()).toEqual([{ x: 1, z: 2 }, 1, { z: 2 }]);
    },
  );

  it.each([FEATURES.destructuring, restSpread])(
    "lowers older private patterns before class fields with owner %s",
    owner => {
      const { code } = transform(
        `
          class C {
            #x = 42;
            read(other) {
              const { #x: value } = other;
              return value;
            }
            readParam({ #x: value }) { return value; }
          }
          const c = new C();
          return [c.read(c), c.readParam(c)];
        `,
        [
          ...plugins(owner, FEATURES.privateDestructuring),
          transformClassProperties,
        ],
      );
      expect(new Function(code)()).toEqual([42, 42]);
    },
  );
});

it.each([FEATURES.destructuring, FEATURES.privateDestructuring])(
  "keeps object rest/spread native when it is not enabled (owner %s)",
  feature => {
    const input = "var o = { ...a }; function f({ ...rest }) {}";
    expect(transform(input, [plugin(feature)]).code).toBe(
      transform(input, []).code,
    );
  },
);

it("keeps plain destructuring native when only object rest/spread is enabled", () => {
  const input = "var { x } = o; var [y] = a; function f({ z }) {}";
  expect(transform(input, [plugin(restSpread)]).code).toBe(
    transform(input, []).code,
  );
});
