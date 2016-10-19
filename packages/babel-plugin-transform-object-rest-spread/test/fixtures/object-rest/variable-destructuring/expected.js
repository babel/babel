var z = {};
var x = babelHelpers.objectWithoutProperties(z, []);

var { x1 } = z;
var y1 = babelHelpers.objectWithoutProperties(z, ["x1"]);
var { [a]: b } = z;
var c = babelHelpers.objectWithoutProperties(z, [a]);
var { x1 } = z;
var y1 = babelHelpers.objectWithoutProperties(z, ["x1"]);
let { x2, y2 } = z;
let z2 = babelHelpers.objectWithoutProperties(z, ["x2", "y2"]);
const { w3, x3, y3 } = z;
const z4 = babelHelpers.objectWithoutProperties(z, ["w3", "x3", "y3"]);