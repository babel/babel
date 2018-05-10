function _templateObject3() {
  const data = /*#__PURE__*/ _taggedTemplateLiteralLoose(["wow\naB", " ", ""], ["wow\\naB", " ", ""]);

  _templateObject3 = function () {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = /*#__PURE__*/ _taggedTemplateLiteralLoose(["wow\nab", " ", ""], ["wow\\nab", " ", ""]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = /*#__PURE__*/ _taggedTemplateLiteralLoose(["wow\na", "b ", ""], ["wow\\na", "b ", ""]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var foo = bar(_templateObject(), 42, _.foobar());
var bar = bar(_templateObject2(), 42, _.foobar());
var bar = bar(_templateObject3(), 42, _.baz());
