var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_templateObject = _templateObject || /*#__PURE__*/ _taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]), 42, _.foobar());
var bar = bar(_templateObject2 = _templateObject2 || /*#__PURE__*/ _taggedTemplateLiteral(["wow\nab", " ", ""], ["wow\\nab", " ", ""]), 42, _.foobar());
var bar = bar(_templateObject3 = _templateObject3 || /*#__PURE__*/ _taggedTemplateLiteral(["wow\naB", " ", ""], ["wow\\naB", " ", ""]), 42, _.baz());
