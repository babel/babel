var outputFileSync = require("output-file-sync");
var chokidar       = require("chokidar");
var globParent     = require("glob-parent");
var path           = require("path");
var util           = require("./util");
var glob           = require("glob");
var fs             = require("fs");
var _              = require("lodash");

module.exports = function (commander, opts) {

  var destFilePath = function(filename) {
    // remove extension and then append back on .js
    filename = filename.replace(/\.(\w*?)$/, "") + ".js";
    return path.join(commander.outDir, filename);
  };

  var write = function (src, relative) {
    var dest = destFilePath(relative);

    var data = util.compile(src, {
      sourceFileName: path.relative(dest + "/..", src)
    });

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

  // first pass compile
  _.each(commander.args, function(arg) {
    var root = globParent(arg);
    var filenames = glob.sync(arg);

    _.each(filenames, function(filename) {

      var stat = fs.statSync(filename);

      if (stat.isDirectory(filename)) {
        var dirname = filename;

        _.each(util.readdir(dirname), function (filename) {
          var src = path.join(dirname, filename);
          handleFile(src, filename);
        });
      } else {
        var relative = path.relative(root, filename) || filename;
        handleFile(filename, relative);
      }
    });
  });

  // setup watch
  if (commander.watch) {
    var cache = {};

    _.each(commander.args, function (glob) {
      var watcher = chokidar.watch(glob, {
        persistent: true,
        ignoreInitial: true
      });

      var root = globParent(glob);
      _.each(["add", "change", "unlink"], function (type) {
        watcher.on(type, function (filename, stats) {
          var relative = path.relative(root, filename) || filename;

          if (type === "unlink") {
            cache[filename] = undefined;
            var dest = destFilePath(relative);
            console.log("unlink %s", dest);
            if (fs.existsSync(dest))
              fs.unlink(dest);
            if (fs.existsSync(dest + ".map"))
              fs.unlink(dest + ".map");
          } else {
            var statsMtime;
            if (stats) statsMtime = stats.mtime.getTime();
            var mtime = cache[filename];
            if (!mtime || mtime !== statsMtime) {
              cache[filename] = statsMtime;
              try {
                handleFile(filename, relative);
              } catch (err) {
                console.error(err.stack);
              }
            }
          }
        });
      });
    });
  }
};
