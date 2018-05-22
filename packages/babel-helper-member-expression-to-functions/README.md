# @babel/helper-member-expression-to-functions

Helper function to replace certain member expressions with function calls

## Usage

> Designed for internal Babel use.

Traverses the `path` using the supplied `visitor` and an augmented `state`.

```js
const visitor = {
  MemberExpression(memberPath, state) {

    if (someCondition(memberPath)) {

      // The handle method is supplied by memberExpressionToFunctions.
      // It should be called whenever a MemberExpression should be
      // converted into the proper function calls.
      state.handle(memberPath);

    }

  },
};

// The helper requires three special methods on state: `get`, `set`, and
// `call`.
// Optionally, a special `memoise` method may be defined, which gets
// called if the member is in a self-referential update expression.
// Everything else will be passed through as normal.
const state = {
  get(memberPath) {
    // Return some AST that will get the member
    return t.callExpression(
      this.file.addHelper('superGet'),
      [t.thisExpression(), memberPath.node.property]
    );
  },

  set(memberPath, value) {
    // Return some AST that will set the member
    return t.callExpression(
      this.file.addHelper('superSet'),
      [t.thisExpression(), memberPath.node.property, value]
    );
  },

  call(memberPath, args) {
    // Return some AST that will call the member with the proper context
    // and args
    return t.callExpression(
      t.memberExpression(this.get(memberPath), t.identifier("apply")),
      [t.thisExpression(), t.arrayExpression(args)]
    );
  },

  memoise(memberPath) {
    const { node } = memberPath;
    if (node.computed) {
      MEMOISED.set(node, ...);
    }
  },

  // The handle method is provided by memberExpressionToFunctions.
  // handle(memberPath) { ... }

  // Other state stuff is left untouched.
  someState: new Set(),
};

// Replace all the special MemberExpressions in rootPath, as determined
// by our visitor, using the state methods.
memberExpressionToFunctions(rootPath, visitor, state);
```
