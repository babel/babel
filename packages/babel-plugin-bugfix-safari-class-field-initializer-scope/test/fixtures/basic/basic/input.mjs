let someVariable = 1;

class MyClass {
  // These things should not need transforming
  numericLiteral = 1;
  stringLiteral = 'string';
  booleanLiteral = true;
  nullLiteral = null;
  simpleTemplateLiteral = `template literal ${"with simple interpolation"}`;
  simpleTaggedTemplateLiteral = this.foo`template literal ${"with simple interpolation"}`;
  emptyObjectLiteral = {};
  simpleObjectLiteral = {
    one: "two",
    two: ["array", "of", "literals"]
  };
  emptyArrayLiteral = [];
  simpleArrayLiteral = [1, 2, 3];
  arrow = () => someVariable;
  function = function() { return someVariable };
  iifeArrow = (() => 1)();
  iifeFunction = (function() { return someVariable })();
  thisReference = this.foo;
  optionalMemberExpression = this?.foo;
  optionalCallExpression = this.foo?.();
  sequenceExpression = (1, 2, 3);
  classExpression = class {};

  // These things should be wrapped in IIFEs
  complexRef = someVariable;
  complexInit = someVariable + 1;
  complexObject = {
    one: someVariable,
  }
  complexArray = [
    someVariable
  ]
  complexTemplateLiteral = `template literal ${someVariable}`;
  dynamicThisReference = this[someVariable];
  complexSequenceExpression = (someVariable, 2, 3);
}
