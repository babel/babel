var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = tag((_templateObject = _templateObject || _taggedTemplateLiteral(["wow"])));
var bar = tag((_templateObject2 = _templateObject2 || _taggedTemplateLiteral(["first", "second"])), 1);
