
var result = 0;
var a = {b: {c: function(a, b){ result += (a + b) }}}, args = [1, 2]
a.b.c(...args)
new a.b.c(...args)

console.log(result === 6)