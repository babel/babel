var util = require("./util");
var path = require("path");
var api  = require("./node");
var fs   = require("fs");
var _    = require("lodash");

module.exports = function (opts) {
  opts = _.defaults(opts || {}, {
    options: {},
    dest:    "cache",
    src:     "assets"
  });

  var cache = {};

  return function (req, res, next) {
    var url = req.url;
    if (!util.canCompile(url)) return next();

    var dest = path.join(opts.dest, url);
    var src  = path.join(opts.src, url);

    var write = function (transformed) {
      fs.writeFile(dest, transformed, function (err) {
        if (err) {
          next(err);
        } else {
          cache[url] = Date.now();
          next();
        }
      });
    };

    var compile = function () {
      var transformOpts = _.clone(opts.options);

      api.transformFile(opts.dest, transformOpts, function (err, transformed) {
        if (err) return next(err);
        write(transformed);
      });
    };

    var destExists = function () {
      fs.stat(dest, function (err, stat) {
        if (err) return next(err);

        if (cache[url] < +stat.mtime) {
          compile();
        } else {
          next();
        }
      });
    };

    fs.exists(src, function (exists) {
      if (!exists) return next();

      fs.exists(dest, function (exists) {
        if (exists && cache[dest]) {
          destExists();
        } else {
          compile();
        }
      });
    });
  };
};
