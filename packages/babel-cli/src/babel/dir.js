import defaults from "lodash/defaults";
import outputFileSync from "output-file-sync";
import slash from "slash";
import path from "path";
import fs from "fs";

import * as util from "./util";

export default function(commander, filenames, opts) {
  function write(src, relative, base, callback) {
    if (typeof base === "function") {
      callback = base;
      base = undefined;
    }
    if (!util.isCompilableExtension(relative, commander.extensions)) {
      return callback();
    }

    // remove extension and then append back on .js
    relative = util.adjustRelative(relative, commander.keepFileExtension);

    const dest = getDest(commander, relative, base);

    util.compile(
      src,
      defaults(
        {
          sourceFileName: slash(path.relative(dest + "/..", src)),
          sourceMapTarget: path.basename(relative),
        },
        opts,
      ),
      function(err, res) {
        if (err) return callback(err);
        if (!res) return callback();

        // we've requested explicit sourcemaps to be written to disk
        if (
          res.map &&
          commander.sourceMaps &&
          commander.sourceMaps !== "inline"
        ) {
          const mapLoc = dest + ".map";
          res.code = util.addSourceMappingUrl(res.code, mapLoc);
          outputFileSync(mapLoc, JSON.stringify(res.map));
        }

        outputFileSync(dest, res.code);
        util.chmod(src, dest);

        return callback(null, src + " -> " + dest);
      },
    );
  }

  function getDest(commander, filename, base) {
    if (commander.relative) return path.join(base, commander.outDir, filename);
    return path.join(commander.outDir, filename);
  }

  function handleFile(src, filename, base, callback) {
    if (typeof base === "function") {
      callback = base;
      base = undefined;
    }

    write(src, filename, base, function(err, res) {
      if (err) return callback(err);
      if (!res && commander.copyFiles) {
        const dest = getDest(commander, filename, base);
        outputFileSync(dest, fs.readFileSync(src));
        util.chmod(src, dest);
      }

      return callback(null, res);
    });
  }

  function handle(filename, callback) {
    if (!fs.existsSync(filename)) return;

    const stat = fs.statSync(filename);

    if (stat.isDirectory(filename)) {
      const dirname = filename;

      if (commander.deleteDirOnStart) {
        util.deleteDir(commander.outDir);
      }

      const results = [];
      let filesProcessed = 0;

      const files = util.readdir(dirname, commander.includeDotfiles);
      files.forEach(function(filename, index) {
        const src = path.join(dirname, filename);
        handleFile(src, filename, dirname, function(err, res) {
          if (err) return callback(err);
          results[index] = res;
          filesProcessed++;
          if (filesProcessed === files.length) {
            return callback(null, results);
          }
        });
      });
    } else {
      write(
        filename,
        path.basename(filename),
        path.dirname(filename),
        callback,
      );
    }
  }

  function output(resultsArray) {
    resultsArray.forEach(function(result) {
      if (result) {
        if (Array.isArray(result)) {
          result.forEach(singleResult => {
            if (singleResult) util.log(singleResult);
          });
        } else util.log(result);
      }
    });
  }

  const results = [];
  let filesProcessed = 0;

  if (!commander.skipInitialBuild) {
    filenames.forEach((filename, index) => {
      handle(filename, function(err, res) {
        if (err) throw err;
        results[index] = res;
        filesProcessed++;
        if (filesProcessed === filenames.length) {
          output(results);
        }
      });
    });
  }

  if (commander.watch) {
    const chokidar = util.requireChokidar();

    filenames.forEach(function(dirname) {
      const watcher = chokidar.watch(dirname, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 50,
          pollInterval: 10,
        },
      });

      ["add", "change"].forEach(function(type) {
        watcher.on(type, function(filename) {
          const relative = path.relative(dirname, filename) || filename;
          try {
            handleFile(filename, relative, function(err, res) {
              if (err) throw err;
              util.log(res);
            });
          } catch (err) {
            console.error(err.stack);
          }
        });
      });
    });
  }
}
