// ExportNamedDeclaration
var { b } = asdf2;
// Skip
var c = babelHelpers.objectWithoutProperties(asdf2, ["b"]);
export { b, c };
export var { bb, cc } = ads;
export var [dd, ee] = ads;