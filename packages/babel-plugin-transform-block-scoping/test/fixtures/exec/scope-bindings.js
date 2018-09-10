var code = `var foo = 1;
if (x) {
  const bar = 1;
}`;

var innerScope = true;
var res = transform(code, {
  plugins: opts.plugins.concat([
    function (b) {
      var t = b.types;
      return {
        visitor: {
          Scope: {
            exit: function(path) {
              if (innerScope) {
                expect(Object.keys(path.scope.bindings)).toHaveLength(0);
                innerScope = false;
                return;
              }

              expect(Object.keys(path.scope.bindings)).toHaveLength(2);
            }
          }
        }
      }
    }
  ]),
});

var expected = `var foo = 1;

if (x) {
  var bar = 1;
}`;

expect(res.code).toBe(expected);
