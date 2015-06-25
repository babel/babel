var uglify = require("uglify-js");
var babel  = require(".");
var zlib   = require("zlib");
var vm     = require("vm");
var fs     = require("fs");

var code = fs.readFileSync("/Users/sebmck/Downloads/jquery-1.11.3 (1).js", "utf8");

function sizeof(name, fn) {
  var start = Date.now();
  var code = fn();
  var end = Date.now();
  console.log(name, "time:", (end - start) + "ms", "raw:", (code.length / 1000) + "KB", "gzipped:", (zlib.gzipSync(code).length / 1000) + "KB");
  fs.writeFileSync("jquery." + name + ".js", code);
  new Function(code);
}

sizeof("raw", function () {
  return code;
});

sizeof("babel", function () {
  return babel.transform(code, {
    compact: true,
    experimental: true,
    blacklist: ["strict"],
    plugins: ["minify-booleans", "merge-sibling-variables"]
  }).code;
});

sizeof("uglify", function () {
  return uglify.minify(code, {
    mangle: false,
    fromString: true
  }).code;
});
