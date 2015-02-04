"use strict";

var path = require("path");
var os   = require("os");
var fs   = require("fs");

var FILENAME = path.join(os.tmpdir(), "6to5.json");
var data = {};

exports.save = function () {
  fs.writeFileSync(FILENAME, JSON.stringify(data, null, "  "));
};

exports.load = function () {
  process.on("exit", exports.save);

  var sigint = function () {
    process.removeListener("SIGINT", sigint);
    exports.save();
    process.kill(process.pid, "SIGINT");
  };

  process.on("SIGINT", sigint);

  if (!fs.existsSync(FILENAME)) return;

  try {
    data = JSON.parse(fs.readFileSync(FILENAME));
  } catch (err) {
    return;
  }
};

exports.get = function () {
  return data;
};
