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
    var dest = path.join(commander.outDir, relative);

    var data = util.compile(src, { sourceMapName: dest });

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

      _.each(util.readdirFilter(dirname), function (filename) {
        write(path.join(dirname, filename), filename);
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

      _.each(["add", "change", "unlink"], function (type) {
        watcher.on(type, function (filename) {
          // chop off the dirname plus the path separator
          var relative = filename.slice(dirname.length + 1);

          console.log(type, filename);
          write(filename, relative);
        });
      });
    });
  }
};
