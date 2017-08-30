var _templateObject = _taggedTemplateLiteralLoose(["wow\na", "b ", ""], ["wow\\na", "b ", ""]),
    _templateObject2 = _taggedTemplateLiteralLoose(["wow\nab", " ", ""], ["wow\\nab", " ", ""]),
    _templateObject3 = _taggedTemplateLiteralLoose(["wow\naB", " ", ""], ["wow\\naB", " ", ""]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var foo = bar(_templateObject, 42, _.foobar());
var bar = bar(_templateObject2, 42, _.foobar());
var bar = bar(_templateObject3, 42, _.baz());
