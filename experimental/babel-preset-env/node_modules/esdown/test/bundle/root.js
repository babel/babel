// root.js
import * as FS from "node:fs";
import * as pkg2 from "pkg2";

console.log(pkg2.data);

console.log("before a");
var a = require("./a.js");
console.log(a.a);

require("fs");
require("pkg1");
require("pkg1/deep");
