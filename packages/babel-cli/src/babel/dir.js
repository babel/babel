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
      return process.nextTick(callback);
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

        util.log(src + " -> " + dest);
        return callback(null, true);
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

      return callback();
    });
  }

  function sequentialHandleFile(files, dirname, index, callback) {
    if (typeof index === "function") {
      callback = index;
      index = 0;
    }

    const filename = files[index];
    const src = path.join(dirname, filename);

    handleFile(src, filename, dirname, function(err) {
      if (err) return callback(err);
      index++;
      if (index !== files.length) {
        sequentialHandleFile(files, dirname, index, callback);
      } else {
        callback();
      }
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

      const files = util.readdir(dirname, commander.includeDotfiles);
      sequentialHandleFile(files, dirname, callback);
    } else {
      write(
        filename,
        path.basename(filename),
        path.dirname(filename),
        callback,
      );
    }
  }

  function sequentialHandle(filenames, index = 0) {
    const filename = filenames[index];

    handle(filename, function(err) {
      if (err) throw err;
      index++;
      if (index !== filenames.length) {
        sequentialHandle(filenames, index);
      }
    });
  }

  if (!commander.skipInitialBuild) {
    sequentialHandle(filenames);
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
            handleFile(filename, relative, function(err) {
              if (err) throw err;
            });
          } catch (err) {
            console.error(err.stack);
          }
        });
      });
    });
  }
}
