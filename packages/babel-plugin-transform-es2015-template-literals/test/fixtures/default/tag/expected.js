var _templateObject = _taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]),
    _templateObject2 = _taggedTemplateLiteral(["wow\nab", " ", ""], ["wow\\nab", " ", ""]),
    _templateObject3 = _taggedTemplateLiteral(["wow\naB", " ", ""], ["wow\\naB", " ", ""]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_templateObject, 42, _.foobar());
var bar = bar(_templateObject2, 42, _.foobar());
var bar = bar(_templateObject3, 42, _.baz());
