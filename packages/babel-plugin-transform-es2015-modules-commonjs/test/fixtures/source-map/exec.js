var tests = [
  'import "foo";',
  'import foo from "foo";',
  'import {default as foo2} from "foo";',
  'import * as foo from "foo";',
  'import {bar} from "foo";',
  'import {bar2, baz} from "foo";',
  'import {bar as baz2} from "foo";',
  'import {bar as baz3, xyz} from "foo";',

  'export default 42;',
  'export {foo};',
  'export { foo as default };',
  'export * from "foo";',
  'export {foo} from "foo";',
  'export {default as foo} from "foo";',
];

tests.forEach(function (code) {
  var res = transform(code, {
    sourceMap: true,
    plugins: opts.plugins
  });

  // Should create mapping
  assert.notEqual(
    res.map.mappings,
    '',
    'expected to generate sourcemap for: ' + code
  );
});
