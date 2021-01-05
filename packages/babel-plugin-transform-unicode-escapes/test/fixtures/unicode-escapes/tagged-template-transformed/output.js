var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

test(_templateObject || (_templateObject = _taggedTemplateLiteral(["\uD835\uDC9C\uD835\uDC9C\uD835\uDC9C"], ["\uD835\uDC9C\\ud835\\udc9c\\u{1d49c}"])));
test(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\uD835\uDC9C"], ["\\u{1d49c}"])));
test(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\\u{1d49c}"], ["\\\\u{1d49c}"])));
test(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\\\uD835\uDC9C"], ["\\\\\\u{1d49c}"])));
test(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\\\\u{1d49c}"], ["\\\\\\\\u{1d49c}"])));
