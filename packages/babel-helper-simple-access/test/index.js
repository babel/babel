import * as babel from "@babel/core";
import simplifyAccess from "../lib/index.js";

const plugin = (_api, options) => {
  // TODO(Babel 8): Remove includeUpdateExpression
  const { includeUpdateExpression, bindingNames } = options;

  return {
    visitor: {
      Program(path) {
        (simplifyAccess.default || simplifyAccess)(
          path,
          new Set(bindingNames),
          includeUpdateExpression,
        );
      },
    },
  };
};

const itBabel7 = process.env.BABEL_8_BREAKING ? it.skip : it;

itBabel7("simplifyAccess with default config", function () {
  const code = `
    let a = foo++;
    a = ++foo;
    foo++;
    ++foo;
    ++a;
    a++;
    foo = a++;
    foo = ++a;
    
    let b = bar--;
    b = --bar;
    bar--;
    --bar;
    --b;
    b--;
    bar = b--;
    bar = --b;
    
    let c = baz += 1;
    baz += 1;
    c += 1;
    
    function f() {
        let foo = 1;
        let a = foo++;
        a = ++foo;
        foo++;
        ++foo;
        ++a;
        a++;
        foo = a++;
        foo = ++a;
    }
`;

  const output = babel.transformSync(code, {
    configFile: false,
    ast: false,
    plugins: [[plugin, { bindingNames: ["foo", "bar", "baz"] }]],
  }).code;

  expect(output).toMatchInlineSnapshot(`
    "var _foo, _bar;
    let a = (_foo = +foo, foo = _foo + 1, _foo);
    a = foo = +foo + 1;
    foo = foo + 1;
    foo = foo + 1;
    ++a;
    a++;
    foo = a++;
    foo = ++a;
    let b = (_bar = +bar, bar = _bar - 1, _bar);
    b = bar = +bar - 1;
    bar = bar - 1;
    bar = bar - 1;
    --b;
    b--;
    bar = b--;
    bar = --b;
    let c = baz = baz + 1;
    baz = baz + 1;
    c += 1;
    function f() {
      let foo = 1;
      let a = foo++;
      a = ++foo;
      foo++;
      ++foo;
      ++a;
      a++;
      foo = a++;
      foo = ++a;
    }"
  `);
});

it("simplifyAccess with includeUpdateExpression=false", function () {
  const code = `
    let a = foo++;
    a = ++foo;
    foo++;
    ++foo;
    ++a;
    a++;
    foo = a++;
    foo = ++a;
    
    let b = bar--;
    b = --bar;
    bar--;
    --bar;
    --b;
    b--;
    bar = b--;
    bar = --b;
    
    let c = baz += 1;
    baz += 1;
    c += 1;
    
    function f() {
        let foo = 1;
        let a = foo++;
        a = ++foo;
        foo++;
        ++foo;
        ++a;
        a++;
        foo = a++;
        foo = ++a;
    }
`;

  const output = babel.transformSync(code, {
    configFile: false,
    ast: false,
    plugins: [
      [
        plugin,
        { includeUpdateExpression: false, bindingNames: ["foo", "bar", "baz"] },
      ],
    ],
  }).code;

  expect(output).toMatchInlineSnapshot(`
    "let a = foo++;
    a = ++foo;
    foo++;
    ++foo;
    ++a;
    a++;
    foo = a++;
    foo = ++a;
    let b = bar--;
    b = --bar;
    bar--;
    --bar;
    --b;
    b--;
    bar = b--;
    bar = --b;
    let c = baz = baz + 1;
    baz = baz + 1;
    c += 1;
    function f() {
      let foo = 1;
      let a = foo++;
      a = ++foo;
      foo++;
      ++foo;
      ++a;
      a++;
      foo = a++;
      foo = ++a;
    }"
  `);
});
