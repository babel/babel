import merge from "lodash/object/merge";
import path from "path";
import fs from "fs";

var cache = {};

function exists(filename) {
  var cached = cache[filename];
  if (cached != null) return cached;
  return cache[filename] = fs.existsSync(filename);
}

export default function (loc, opts = {}) {
  var rel = ".babelrc";

  function find(start, rel) {
    var file = path.join(start, rel);

    if (exists(file)) {
      var content = fs.readFileSync(file, "utf8");
      var json;

      try {
        json = JSON.parse(content);
      } catch (err) {
        err.message = `${file}: ${err.message}`;
        throw err;
      }

      if (json.breakConfig) return;
      merge(opts, json, function(a, b) {
        if (Array.isArray(a)) {
          return a.concat(b);
        }
      });
    }

    var up = path.dirname(start);
    if (up !== start) { // root
      find(up, rel);
    }
  }

  find(loc, rel);

  return opts;
};
