var [a, b] = [1, 2];
var [[a, b]] = [[1, 2]];
var [a, b, ...c] = [1, 2, 3, 4];
var [[a, b, ...c]] = [[1, 2, 3, 4]];

var [a, b] = [1, 2, 3];
var [[a, b]] = [[1, 2, 3]];
var [a, b] = [a, b];
[a[0], a[1]] = [a[1], a[0]];
var [a, b] = [...foo, bar];
var [a, b] = [foo(), bar];
var [a, b] = [clazz.foo(), bar];
var [a, b] = [clazz.foo, bar];
