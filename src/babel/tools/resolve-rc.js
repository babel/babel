import stripJsonComments from "strip-json-comments";
import merge from "lodash/object/merge";
import path from "path";
import fs from "fs";

var cache = {};
var jsons = {};

function exists(filename) {
  if (!fs.existsSync) return false;

  var cached = cache[filename];
  if (cached != null) return cached;
  return cache[filename] = fs.existsSync(filename);
}

export default function (loc, opts = {}) {
  var rel = ".babelrc";

  if (!opts.babelrc) {
    opts.babelrc = [];
  }

  function find(start, rel) {
    var file = path.join(start, rel);

    if (opts.babelrc.indexOf(file) >= 0) {
      return;
    }

    if (exists(file)) {
      var content = fs.readFileSync(file, "utf8");
      var json;

      try {
        json = jsons[content] = jsons[content] || JSON.parse(stripJsonComments(content));
      } catch (err) {
        err.message = `${file}: ${err.message}`;
        throw err;
      }

      opts.babelrc.push(file);

      if (json.breakConfig) return;
      merge(opts, json, function(a, b) {
        if (Array.isArray(a)) {
          var c = a.slice(0);
          for (var v of b) {
            if (a.indexOf(v) < 0) {
              c.push(v);
            }
          }
          return c;
        }
      });
    }

    var up = path.dirname(start);
    if (up !== start) { // root
      find(up, rel);
    }
  }

  if (opts.babelrc.indexOf(loc) < 0 && opts.breakConfig !== true) {
    find(loc, rel);
  }

  return opts;
};
