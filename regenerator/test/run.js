var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var recast = require("recast");
var regenerate = require("../main");

function convert(es6File, es5File) {
  var es6 = fs.readFileSync(es6File, "utf-8");
  var tabWidth = require("../lib/util").guessTabWidth(es6);
  var options = { tabWidth: tabWidth };
  var ast = recast.parse(es6, options);
  var es5 = recast.print(regenerate.transform(ast), options);
  fs.writeFileSync(es5File, es5);
}

convert("test/tests.es6.js", "test/tests.es5.js");

function bundle(es5File, browserFile) {
  var browserify = require("browserify");
  var b = browserify();
  b.add(es5File);
  b.bundle(function(err, src) {
    if (err) throw err;
    fs.writeFileSync(browserFile, src);
  });
}

bundle("./test/tests.es5.js", "test/tests.browser.js");

spawn("mocha", [
  "--reporter", "spec",
  "test/tests.es5.js"
], {
  stdio: "inherit"
});
