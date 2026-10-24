var [{ x }, y, z, w] = [obj, [1, 2], { a: 1 }, () => x];
var [{ x: x2 }, y2] = [obj, [mutable]];
var [{ x: x3 }, y3] = [obj, { [key]: 1 }];
var [{ x: x4 }, y4, z4] = [obj, , 1];
