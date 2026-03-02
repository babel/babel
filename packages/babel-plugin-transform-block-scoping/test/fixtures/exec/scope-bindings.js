var code = `var foo = 1;
if (x) {
  const bar = 1;
}`;

var expected = `var foo = 1;
if (x) {
  var bar = 1;
}`;

var innerScope = true;
return transformAsync(code, {
  configFile: false,
  plugins: opts.plugins.concat([
    function ({ types: t }) {
      return {
        visitor: {
          Scope: {
            exit: function (path) {
              if (innerScope) {
                expect(Object.keys(path.scope.bindings)).toHaveLength(0);
                innerScope = false;
                return;
              }

              expect(Object.keys(path.scope.bindings)).toHaveLength(2);
            },
          },
        },
      };
    },
  ]),
}).then(res => {
  expect(res.code).toBe(expected);
  expect(innerScope).toBe(false);
});
