var child = require("child_process");
var fs    = require("fs");

var tmpLoc = __dirname + "/tmp";

var readTree = function () {

};

var run = function (name, args, callback) {
  args = [__dirname + "/../bin." + name].concat(args);
  var spawn = child.spawn(process.execPath, args);

  var data = "";

  spawn.stdout.on("write", function (chunk) {
    data += chunk;
  });

  spawn.on("close", function () {
    callback(data);
  });
};

before(function () {
  if (!fs.existsSync(tmpLoc)) fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
});

suite("bin/6to5", function () {
  test("--source-maps-inline");

  test("--source-maps");

  test("--whitelist");

  test("--blacklist");

  test("--out-file");

  test("--out-dir");

  test("stdout");
});

suite("bin/6to5-node", function () {
  test("--eval");

  test("--print");
});
