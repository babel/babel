var outputFileSync = require("output-file-sync");
var pathExists     = require("path-exists");
var chokidar       = require("chokidar");
var slash          = require("slash");
var path           = require("path");
var util           = require("./util");
var fs             = require("fs");
var _              = require("lodash");

module.exports = function (commander, filenames) {
  var write = function (src, relative) {
    // remove extension and then append back on .js
    relative = relative.replace(/\.(\w*?)$/, "") + ".js";

    var dest = path.join(commander.outDir, relative);

    var data = util.compile(src, {
      sourceFileName: slash(path.relative(dest + "/..", src)),
      sourceMapTarget: path.basename(relative)
    });
    if (data.ignored) return;

    if (commander.sourceMaps && commander.sourceMaps !== "inline") {
      var mapLoc = dest + ".map";
      data.code = util.addSourceMappingUrl(data.code, mapLoc);
      outputFileSync(mapLoc, JSON.stringify(data.map));
    }

    outputFileSync(dest, data.code);

    console.log(src + " -> " + dest);
  };

  var handleFile = function (src, filename) {
    if (util.shouldIgnore(src)) return;

    if (util.canCompile(filename, commander.extensions)) {
      write(src, filename);
    } else if (commander.copyFiles) {
      outputFileSync(path.join(commander.outDir, filename), fs.readFileSync(src));
    }
  };

  var handle = function (filename) {
    if (!pathExists.sync(filename)) return;

    var stat = fs.statSync(filename);

    if (stat.isDirectory(filename)) {
      var dirname = filename;

      _.each(util.readdir(dirname), function (filename) {
        var src = path.join(dirname, filename);
        handleFile(src, filename);
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
          try {
            handleFile(filename, relative);
          } catch (err) {
            console.error(err.stack);
          }
        });
      });
    });
  }
};
