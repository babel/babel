var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var tag = v => v;

function foo() {
  return tag(_templateObject = _templateObject || /*#__PURE__*/ _taggedTemplateLiteral(["some template"]));
}

function bar() {
  return tag(_templateObject2 = _templateObject2 || /*#__PURE__*/ _taggedTemplateLiteral(["some template"]));
}

expect(foo()).toBe(foo());
expect(foo()).toEqual(["some template"]);
expect(bar()).toBe(bar());
expect(bar()).toEqual(["some template"]);
expect(bar()).not.toBe(foo());
