let someVariable = 1;
class MyClass {
    numericLiteral = 1;
    stringLiteral = 'string';
    booleanLiteral = true;
    nullLiteral = null;
    objectLiteral = (() => ({}))();
    arrayLiteral = (() => [])();
    complexThing = (() => someVariable)();
}
