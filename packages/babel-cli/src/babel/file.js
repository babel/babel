let convertSourceMap = require("convert-source-map");
let pathExists       = require("path-exists");
let sourceMap        = require("source-map");
let slash            = require("slash");
let path             = require("path");
let util             = require("./util");
let fs               = require("fs");
let each             = require("lodash.foreach");

module.exports = function (commander, filenames, opts) {
  if (commander.sourceMaps === "inline") {
    opts.sourceMaps = true;
  }

  let results = [];

  let buildResult = function () {
    let map = new sourceMap.SourceMapGenerator({
      file: path.basename(commander.outFile || "") || "stdout",
      sourceRoot: opts.sourceRoot
    });

    let code = "";
    let offset = 0;

    each(results, function (result) {
      let filename = result.filename || "stdout";
      code += result.code + "\n";

      if (result.map) {
        let consumer = new sourceMap.SourceMapConsumer(result.map);

        let sourceFilename = filename;
        if (commander.outFile) {
          sourceFilename = path.relative(path.dirname(commander.outFile), sourceFilename);
        }
        sourceFilename = slash(sourceFilename);

        map._sources.add(sourceFilename);
        map.setSourceContent(sourceFilename, result.actual);

        consumer.eachMapping(function (mapping) {
          map._mappings.add({
            generatedLine: mapping.generatedLine + offset,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.source == null ? null : mapping.originalLine,
            originalColumn: mapping.source == null ? null : mapping.originalColumn,
            source: mapping.source == null ? null : sourceFilename
          });
        });

        offset = code.split("\n").length;
      }
    });

    // add the inline sourcemap comment if we've either explicitly asked for inline source
    // maps, or we've requested them without any output file
    if (commander.sourceMaps === "inline" || (!commander.outFile && commander.sourceMaps)) {
      code += "\n" + convertSourceMap.fromObject(map).toComment();
    }

    return {
      map: map,
      code: code
    };
  };

  let output = function () {
    let result = buildResult();

    if (commander.outFile) {
      // we've requested for a sourcemap to be written to disk
      if (commander.sourceMaps && commander.sourceMaps !== "inline") {
        let mapLoc = commander.outFile + ".map";
        result.code = util.addSourceMappingUrl(result.code, mapLoc);
        fs.writeFileSync(mapLoc, JSON.stringify(result.map));
      }

      fs.writeFileSync(commander.outFile, result.code);
    } else {
      process.stdout.write(result.code + "\n");
    }
  };

  let stdin = function () {
    let code = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", function () {
      let chunk = process.stdin.read();
      if (chunk !== null) code += chunk;
    });

    process.stdin.on("end", function () {
      results.push(util.transform(commander.filename, code));
      output();
    });
  };

  let walk = function () {
    let _filenames = [];
    results = [];

    each(filenames, function (filename) {
      if (!pathExists.sync(filename)) return;

      let stat = fs.statSync(filename);
      if (stat.isDirectory()) {
        let dirname = filename;

        each(util.readdirFilter(filename), function (filename) {
          _filenames.push(path.join(dirname, filename));
        });
      } else {
        _filenames.push(filename);
      }
    });

    each(_filenames, function (filename) {
      if (util.shouldIgnore(filename)) return;

      let data = util.compile(filename);
      if (data.ignored) return;
      results.push(data);
    });

    output();
  };

  let files = function () {

    if (!commander.skipInitialBuild) {
      walk();
    }

    if (commander.watch) {
      let chokidar = util.requireChokidar();
      chokidar.watch(filenames, {
        persistent: true,
        ignoreInitial: true
      }).on("all", function (type, filename) {
        if (util.shouldIgnore(filename) || !util.canCompile(filename, commander.extensions)) return;

        if (type === "add" || type === "change") {
          util.log(type + " " + filename);
          try {
            walk();
          } catch (err) {
            console.error(err.stack);
          }
        }
      });
    }
  };

  if (filenames.length) {
    files();
  } else {
    stdin();
  }
};
