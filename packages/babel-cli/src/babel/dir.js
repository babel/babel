import defaults from "lodash/defaults";
import outputFileSync from "output-file-sync";
import slash from "slash";
import path from "path";
import fs from "fs";

import * as util from "./util";

let compiledFiles = 0;

export default function({ cliOptions, babelOptions }) {
  const filenames = cliOptions.filenames;

  function write(src, base, callback) {
    let relative = path.relative(base, src);
    if (!util.isCompilableExtension(relative, cliOptions.extensions)) {
      return process.nextTick(callback);
    }

    // remove extension and then append back on .js
    relative = util.adjustRelative(relative, cliOptions.keepFileExtension);

    const dest = getDest(relative, base);

    util.compile(
      src,
      defaults(
        {
          sourceFileName: slash(path.relative(dest + "/..", src)),
        },
        babelOptions,
      ),
      function(err, res) {
        if (err && cliOptions.watch) {
          console.error(err);
          err = null;
        }
        if (err) return callback(err);
        if (!res) return callback();

        // we've requested explicit sourcemaps to be written to disk
        if (
          res.map &&
          babelOptions.sourceMaps &&
          babelOptions.sourceMaps !== "inline"
        ) {
          const mapLoc = dest + ".map";
          res.code = util.addSourceMappingUrl(res.code, mapLoc);
          res.map.file = path.basename(relative);
          outputFileSync(mapLoc, JSON.stringify(res.map));
        }

        outputFileSync(dest, res.code);
        util.chmod(src, dest);

        compiledFiles += 1;

        if (cliOptions.verbose) {
          console.log(src + " -> " + dest);
        }
        return callback(null, true);
      },
    );
  }

  function getDest(filename, base) {
    if (cliOptions.relative) {
      return path.join(base, cliOptions.outDir, filename);
    }
    return path.join(cliOptions.outDir, filename);
  }

  function outputDestFolder(outDir) {
    const outDirPath = path.resolve(outDir);
    if (!fs.existsSync(outDirPath)) {
      fs.mkdirSync(outDirPath);
    }
  }

  function handleFile(src, base, callback) {
    write(src, base, function(err, res) {
      if (err) return callback(err);
      if (!res && cliOptions.copyFiles) {
        const filename = path.relative(base, src);
        const dest = getDest(filename, base);
        outputFileSync(dest, fs.readFileSync(src));
        util.chmod(src, dest);
      }

      return callback();
    });
  }

  function sequentialHandleFile(files, dirname, index, callback) {
    if (files.length === 0) {
      outputDestFolder(cliOptions.outDir);
      return;
    }

    if (typeof index === "function") {
      callback = index;
      index = 0;
    }

    const filename = files[index];
    const src = path.join(dirname, filename);

    handleFile(src, dirname, function(err) {
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

      if (cliOptions.deleteDirOnStart) {
        util.deleteDir(cliOptions.outDir);
      }

      const files = util.readdir(dirname, cliOptions.includeDotfiles);
      sequentialHandleFile(files, dirname, callback);
    } else {
      write(filename, path.dirname(filename), callback);
    }
  }

  function sequentialHandle(filenames, index = 0) {
    const filename = filenames[index];

    handle(filename, function(err) {
      if (err) throw new Error(err);
      index++;
      if (index !== filenames.length) {
        sequentialHandle(filenames, index);
      } else {
        console.log(
          `🎉  Successfully compiled ${compiledFiles} ${
            compiledFiles > 1 ? "files" : "file"
          } with Babel.`,
        );
      }
    });
  }

  if (!cliOptions.skipInitialBuild) {
    sequentialHandle(filenames);
  }

  if (cliOptions.watch) {
    const chokidar = util.requireChokidar();

    filenames.forEach(function(filenameOrDir) {
      const watcher = chokidar.watch(filenameOrDir, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 50,
          pollInterval: 10,
        },
      });

      ["add", "change"].forEach(function(type) {
        watcher.on(type, function(filename) {
          handleFile(
            filename,
            filename === filenameOrDir
              ? path.dirname(filenameOrDir)
              : filenameOrDir,
            function(err) {
              if (err) console.error(err.stack);
            },
          );
        });
      });
    });
  }
}
