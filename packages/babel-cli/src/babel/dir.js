import defaults from "lodash/defaults";
import outputFileSync from "output-file-sync";
import slash from "slash";
import path from "path";
import fs from "fs";

import * as util from "./util";

export default function(commander, filenames, opts) {
  function write(src, relative, base) {
    if (!util.isCompilableExtension(relative, commander.extensions)) {
      return false;
    }

    // remove extension and then append back on .js
    relative = util.adjustRelative(relative, commander.keepFileExtension);

    const dest = getDest(commander, relative, base);

    const data = util.compile(
      src,
      defaults(
        {
          sourceFilename: slash(path.relative(dest + "/..", src)),
          sourceMapTarget: path.basename(relative),
        },
        opts,
      ),
    );

    if (!data) return false;

    // we've requested explicit sourcemaps to be written to disk
    if (data.map && commander.sourceMaps && commander.sourceMaps !== "inline") {
      const mapLoc = dest + ".map";
      data.code = util.addSourceMappingUrl(data.code, mapLoc);
      outputFileSync(mapLoc, JSON.stringify(data.map));
    }

    outputFileSync(dest, data.code);
    util.chmod(src, dest);

    util.log(src + " -> " + dest);

    return true;
  }

  function getDest(commander, filename, base) {
    if (commander.relative) return path.join(base, commander.outDir, filename);
    return path.join(commander.outDir, filename);
  }

  function handleFile(src, filename, base) {
    const didWrite = write(src, filename, base);

    if (!didWrite && commander.copyFiles) {
      const dest = getDest(commander, filename, base);
      outputFileSync(dest, fs.readFileSync(src));
      util.chmod(src, dest);
    }
  }

  function handle(filename) {
    if (!fs.existsSync(filename)) return;

    const stat = fs.statSync(filename);

    if (stat.isDirectory(filename)) {
      const dirname = filename;

      if (commander.deleteDirOnStart) {
        util.deleteDir(commander.outDir);
      }

      util
        .readdir(dirname, commander.includeDotfiles)
        .forEach(function(filename) {
          const src = path.join(dirname, filename);
          handleFile(src, filename, dirname);
        });
    } else {
      write(filename, path.basename(filename), path.dirname(filename));
    }
  }

  if (!commander.skipInitialBuild) {
    filenames.forEach(handle);
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
            handleFile(filename, relative);
          } catch (err) {
            console.error(err.stack);
          }
        });
      });
    });
  }
}
