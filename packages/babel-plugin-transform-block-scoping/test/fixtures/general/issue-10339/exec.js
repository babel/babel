const code = multiline([
  "for (const {foo, ...bar} of { bar: [] }) {",
    "() => foo;",
    "const [qux] = bar;",
    "try {} catch (e) {",
      "let quux = qux;",
    "}",
  "}"
]);

transform(code, {
  configFile: false,
  plugins: [
    "../../../../lib",
    {
      post({ path }) {
        path.traverse({
          Program(path) {
            expect(Object.keys(path.scope.bindings)).toEqual(["foo", "bar"]);
          },
          ForOfStatement(path) {
            // for declarations should be transformed to for bindings
            expect(path.scope.bindings).toEqual({});
            // The body should be wrapped into closure
            expect(path.get("body").scope.bindings).toEqual({});
          },
          FunctionExpression(path) {
            expect(Object.keys(path.scope.bindings)).toEqual(["foo", "bar", "qux", "quux"]);
          }
        })
      }
    }
  ]
});
