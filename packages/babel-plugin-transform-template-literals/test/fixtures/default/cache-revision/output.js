var _templateObject, _templateObject2;
var tag = v => v;
function foo() {
  return tag(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["some template"])));
}
function bar() {
  return tag(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["some template"])));
}
expect(foo()).toBe(foo());
expect(foo()).toEqual(["some template"]);
expect(bar()).toBe(bar());
expect(bar()).toEqual(["some template"]);
expect(bar()).not.toBe(foo());
