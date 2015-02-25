"use strict";

var merge = require("lodash/object/merge");
var path  = require("path");
var fs    = require("fs");

var cache = {};

function exists(filename) {
  var cached = cache[filename];
  if (cached != null) return cached;
  return cache[filename] = fs.existsSync(filename);
}

module.exports = function (loc, opts) {
  var rel = ".babelrc";
  opts = opts || {};

  function find(start, rel) {
    var file = path.join(start, rel);

    if (exists(file)) {
      var content = fs.readFileSync(file, "utf8");
      var json;

      try {
        json = JSON.parse(content);
      } catch (err) {
        err.filename = file + ": " + err.filename;
        throw err;
      }

      opts = merge(json, opts);
    }

    var up = path.dirname(start);
    if (up !== start) { // root
      find(up, rel);
    }
  }

  find(loc, rel);

  return opts;
};
