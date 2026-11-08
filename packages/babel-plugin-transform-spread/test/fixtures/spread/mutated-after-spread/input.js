var a = [1, 2];
var b = [...a, a.push(3)];

var c = [1, 2];
foo(...c, c.pop());
