let outputFileSync = require("output-file-sync");
let slash          = require("slash");
let path           = require("path");
let util           = require("./util");
let fs             = require("fs");
let _              = require("lodash");

module.exports = function (commander, filenames) {
  function write(src, relative) {
    // remove extension and then append back on .js
    relative = relative.replace(/\.(\w*?)$/, "") + ".js";

    let dest = path.join(commander.outDir, relative);

    let data = util.compile(src, {
      sourceFileName: slash(path.relative(dest + "/..", src)),
      sourceMapTarget: path.basename(relative)
    });
    if (!commander.copyFiles && data.ignored) return;

    // we've requested explicit sourcemaps to be written to disk
    if (data.map && commander.sourceMaps && commander.sourceMaps !== "inline") {
      let mapLoc = dest + ".map";
      data.code = util.addSourceMappingUrl(data.code, mapLoc);
      outputFileSync(mapLoc, JSON.stringify(data.map));
    }

    outputFileSync(dest, data.code);
    util.chmod(src, dest);

    util.log(src + " -> " + dest);
  }

  function handleFile(src, filename) {
    if (util.shouldIgnore(src)) return;

    if (util.canCompile(filename, commander.extensions)) {
      write(src, filename);
    } else if (commander.copyFiles) {
      let dest = path.join(commander.outDir, filename);
      outputFileSync(dest, fs.readFileSync(src));
      util.chmod(src, dest);
    }
  }

  function handle(filename) {
    if (!fs.existsSync(filename)) return;

    let stat = fs.statSync(filename);

    if (stat.isDirectory(filename)) {
      let dirname = filename;

      _.each(util.readdir(dirname), function (filename) {
        let src = path.join(dirname, filename);
        handleFile(src, filename);
      });
    } else {
      write(filename, filename);
    }
  }

  if (!commander.skipInitialBuild) {
    _.each(filenames, handle);
  }

  if (commander.watch) {
    let chokidar = util.requireChokidar();

    _.each(filenames, function (dirname) {
      let watcher = chokidar.watch(dirname, {
        persistent: true,
        ignoreInitial: true
      });

      _.each(["add", "change"], function (type) {
        watcher.on(type, function (filename) {
          let relative = path.relative(dirname, filename) || filename;
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
