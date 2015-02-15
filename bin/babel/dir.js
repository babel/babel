var outputFileSync = require("output-file-sync");
var chokidar       = require("chokidar");
var path           = require("path");
var util           = require("./util");
var fs             = require("fs");
var _              = require("lodash");

module.exports = function (commander, filenames, opts) {
  if (commander.sourceMapsInline) {
    opts.sourceMap = "inline";
  }

  var write = function (src, relative) {
    // remove extension and then append back on .js
    relative = relative.replace(/\.(\w*?)$/, "") + ".js";

    var dest = path.join(commander.outDir, relative);

    var data = util.compile(src, {
      sourceFileName: path.relative(dest + "/..", src)
    });

    if (commander.sourceMaps) {
      var mapLoc = dest + ".map";
      data.code = util.addSourceMappingUrl(data.code, mapLoc);
      outputFileSync(mapLoc, JSON.stringify(data.map));
    }

    outputFileSync(dest, data.code);

    console.log(src + " -> " + dest);
  };

  var handle = function (filename) {
    if (!fs.existsSync(filename)) return;

    var stat = fs.statSync(filename);

    if (stat.isDirectory(filename)) {
      var dirname = filename;

      _.each(util.readdir(dirname), function (filename) {
        var src = path.join(dirname, filename);
        if (util.canCompile(filename)) {
          write(src, filename);
        } else {
          outputFileSync(path.join(commander.outDir, filename), fs.readFileSync(src));
        }
      });
    } else {
      write(filename, filename);
    }
  };

  _.each(filenames, handle);

  if (commander.watch) {
    _.each(filenames, function (dirname) {
      var watcher = chokidar.watch(dirname, {
        persistent: true,
        ignoreInitial: true
      });

      _.each(["add", "change"], function (type) {
        watcher.on(type, function (filename) {
          var relative = path.relative(dirname, filename) || filename;
          write(filename, relative);
        });
      });
    });
  }
};
