var sourceMapToComment = require("source-map-to-comment");
var sourceMap          = require("source-map");
var chokidar           = require("chokidar");
var path               = require("path");
var util               = require("./util");
var fs                 = require("fs");
var _                  = require("lodash");

module.exports = function (commander, filenames) {
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

        map._sources.add(filename);
        map.setSourceContent(filename, result.actual);

        consumer.eachMapping(function (mapping) {
          map._mappings.add({
            generatedLine: mapping.generatedLine + offset,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            source: filename
          });
        });

        offset = code.split("\n").length;
      }
    });

    if (commander.sourceMapsInline || (!commander.outFile && commander.sourceMaps)) {
      code += "\n" + sourceMapToComment(map);
    }

    return {
      map: map,
      code: code
    };
  };

  var output = function () {
    var result = buildResult();

    if (commander.outFile) {
      if (commander.sourceMaps) {
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

    _.each(_filenames, function (filename) {
      results.push(util.compile(filename));
    });

    output();
  };

  var files = function () {
    walk();

    if (commander.watch) {
      chokidar.watch(filenames, {
        persistent: true,
        ignoreInitial: true
      }).on("all", function (type, filename) {
        if (type === "add" || type === "change") {
          console.log(type, filename);
          walk();
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
