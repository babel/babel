// a.js (legacy)
console.log("before b");
var b = require("./b");
exports.a = "a";
console.log(b.b);
