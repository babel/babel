var dynamicThisGetter = () => function () { return this; };
assert.equal(
  '(' + dynamicThisGetter.toString() + ')',
  '(function () {\n  return function () {\n    return this;\n  };\n})'
);
