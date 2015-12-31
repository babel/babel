var objectA = { x1: 1, y1: 2, z1: 3 };
var objectB = { x2: 1, y2: 2, z2: 3 };
var jsxA = <div {...objectA}></div>;
var jsxB = <div a={1} b={2} {...objectA}></div>;
var jsxC = <div {...objectA} a={1} b={2}></div>;
var jsxD = <div a={1} {...objectA} b={2}></div>;
var jsxE = <div a={1} {...objectA} {...objectB} b={2}></div>;
var jsxF = <div a={1} {...objectA} b={2} {...objectB} c={3}></div>;
