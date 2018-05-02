var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var foo = bar((_templateObject = _templateObject || _taggedTemplateLiteralLoose(["wow\na", "b ", ""], ["wow\\na", "b ", ""])), 42, _.foobar());
var bar = bar((_templateObject2 = _templateObject2 || _taggedTemplateLiteralLoose(["wow\nab", " ", ""], ["wow\\nab", " ", ""])), 42, _.foobar());
var bar = bar((_templateObject3 = _templateObject3 || _taggedTemplateLiteralLoose(["wow\naB", " ", ""], ["wow\\naB", " ", ""])), 42, _.baz());
