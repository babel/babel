var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
test(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\uD835\uDC9C\uD835\uDC9C\uD835\uDC9C"], ["\uD835\uDC9C\\ud835\\udc9c\\u{1d49c}"])));
test(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\uD835\uDC9C"], ["\\u{1d49c}"])));
test(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\\u{1d49c}"], ["\\\\u{1d49c}"])));
test(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\\\uD835\uDC9C"], ["\\\\\\u{1d49c}"])));
test(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\\\\u{1d49c}"], ["\\\\\\\\u{1d49c}"])));
