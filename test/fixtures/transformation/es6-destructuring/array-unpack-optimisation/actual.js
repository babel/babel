// opt
var [a, b] = [1, 2];
var [[a, b]] = [[1, 2]];

// deopt
var [a, b] = [1, 2, 3];
var [[a, b]] = [[1, 2, 3]];
var [a, b, ...items] = [1, 2, 3];
var [[a, b, ...items]] = [[1, 2, 3]];
