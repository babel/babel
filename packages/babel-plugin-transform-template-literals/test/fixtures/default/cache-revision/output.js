function _templateObject2() {
  const data = /*#__PURE__*/ _taggedTemplateLiteral(["some template"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = /*#__PURE__*/ _taggedTemplateLiteral(["some template"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var tag = v => v;

function foo() {
  return tag(_templateObject());
}

function bar() {
  return tag(_templateObject2());
}

expect(foo()).toBe(foo());
expect(foo()).toEqual(["some template"]);
expect(bar()).toBe(bar());
expect(bar()).toEqual(["some template"]);
expect(bar()).not.toBe(foo());
