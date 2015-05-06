var convertSourceMap = require("convert-source-map");
var sourceMap        = require("source-map");
var chokidar         = require("chokidar");
var glob             = require("glob");
var path             = require("path");
var util             = require("./util");
var fs               = require("fs");
var _                = require("lodash");


module.exports = function (commander, opts) {
  if (commander.sourceMaps === "inline") {
    opts.sourceMaps = true;
  }

  var results = [];

  var buildResult = function () {
    var map = new sourceMap.SourceMapGenerator({
      file: commander.outFile || "stdout"
    });

    var code = "";
    var offset = 0;

    _.each(results, function (result) {
      var filename = result.filename;
      code += result.code + "\n";

      if (result.map) {
        var consumer = new sourceMap.SourceMapConsumer(result.map);
        var sourceFilename = filename;

        if (commander.outFile) {
          sourceFilename = path.relative(path.dirname(commander.outFile), sourceFilename);
        }

        map._sources.add(sourceFilename);
        map.setSourceContent(sourceFilename, result.actual);

        consumer.eachMapping(function (mapping) {
          map._mappings.add({
            generatedLine: mapping.generatedLine + offset,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            source: sourceFilename
          });
        });

        offset = code.split("\n").length;
      }
    });

    if (commander.sourceMaps === "inline" || (!commander.outFile && commander.sourceMaps)) {
      code += "\n" + convertSourceMap.fromObject(map).toComment();
    }

    return {
      map: map,
      code: code
    };
  };

  var output = function () {
    var result = buildResult();

    if (commander.outFile) {
      if (commander.sourceMaps && commander.sourceMaps !== "inline") {
        var mapLoc = commander.outFile + ".map";
        result.code = util.addSourceMappingUrl(result.code, mapLoc);
        fs.writeFileSync(mapLoc, JSON.stringify(result.map));
      }

      fs.writeFileSync(commander.outFile, result.code);
    } else {
      process.stdout.write(result.code + "\n");
    }
  };

  var stdin = function () {
    var code = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", function () {
      var chunk = process.stdin.read();
      if (chunk !== null) code += chunk;
    });

    process.stdin.on("end", function () {
      results.push(util.transform(commander.filename, code));
      output();
    });
  };

  var walk = function () {
    var _filenames = [];
    results = [];

    _.each(commander.args, function (arg) {
      var filenames = glob.sync(arg);

      _.each(filenames, function (filename) {
        if (!fs.existsSync(filename)) return;

        var stat = fs.statSync(filename);
        if (stat.isDirectory()) {
          var dirname = filename;

          _.each(util.readdirFilter(filename), function (filename) {
            _filenames.push(path.join(dirname, filename));
          });
        } else {
          _filenames.push(filename);
        }
      });
    });

    _.each(_filenames, function (filename) {
      if (util.shouldIgnore(filename)) return;

      results.push(util.compile(filename));
    });

    output();
  };

  var files = function () {
    walk();

    if (commander.watch) {
      var cache = {};

      chokidar.watch(commander.args, {
        persistent: true,
        ignoreInitial: true
      }).on("all", function (type, filename, stats) {
        if (type === "add" || type === "change" || type === "unlink") {
          var statsMtime;
          // no stats with unlink
          if (stats) statsMtime = stats.mtime.getTime();

          var mtime = cache[filename];
          if (!mtime || !stats || mtime !== statsMtime) {
            cache[filename] = statsMtime;
            console.log(type, filename);
            try {
              walk();
            } catch (err) {
              console.error(err.stack);
            }
          }
        }
      });
    }
  };

  if (commander.args.length) {
    files();
  } else {
    stdin();
  }
};
