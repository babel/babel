#!/usr/bin/env node

var commander = require("commander");
var sourceMap = require("source-map");
var transform = require("../../lib/6to5/transform");
var chokidar  = require("chokidar");
var mkdirp    = require("mkdirp");
var util2     = require("../../lib/6to5/util");
var util      = require("./util");
var path      = require("path");
var fs        = require("fs");
var _         = require("lodash");

commander.option("-t, --source-maps-inline", "Append sourceMappingURL comment to bottom of code");
commander.option("-s, --source-maps", "Save source map alongside the compiled code");
commander.option("-f, --filename [filename]", "Filename to use when reading from stdin - this will be used in source-maps, errors etc [stdin]", "stdin");
commander.option("-w, --watch", "Recompile files on changes");

commander.option("-m, --modules [modules]", "Module formatter type to use [common]", "common");
commander.option("-w, --whitelist [whitelist]", "Whitelist of transformers to ONLY use", util2.list);
commander.option("-b, --blacklist [blacklist]", "Blacklist of transformers to NOT use", util2.list);
commander.option("-o, --out-file [out]", "Compile all input files into a single file");
commander.option("-d, --out-dir [out]", "Compile an input directory of modules into an output directory");

commander.on("--help", function(){
  var outKeys = function (title, obj) {
    console.log("  " + title + ":");
    console.log();

    _.each(_.keys(obj).sort(), function (key) {
      if (key[0] === "_") return;
      console.log("    - " + key);
    });

    console.log();
  };

  outKeys("Transformers", transform.transformers);
  outKeys("Module formatters", transform.moduleFormatters);
});

var pkg = require("../../package.json");
commander.version(pkg.version);
commander.usage("[options] <files ...>");
commander.parse(process.argv);

//

var errors = [];

var filenames = commander.args;

_.each(filenames, function (filename) {
  if (!fs.existsSync(filename)) {
    errors.push(filename + " doesn't exist");
  }
});

if (commander.outDir && !filenames.length) {
  errors.push("filenames required for --out-dir");
}

if (commander.outFile && commander.outDir) {
  errors.push("cannot have --out-file and --out-dir");
}

if (commander.watch) {
  if (!commander.outFile && !commander.outDir) {
    errors.push("--watch requires --out-file or --out-dir");
  }

  if (!filenames.length) {
    errors.push("--watch requires filenames");
  }
}

if (commander.sourceMaps) {
  if (!commander.outFile && !commander.outDir) {
    errors.push("--source-maps requires --out-file or --out-dir");
  }
}

if (errors.length) {
  console.error(errors.join(". "));
  process.exit(2);
}

//

exports.opts = {
  sourceMapName: commander.outFile,
  blacklist:     commander.blacklist,
  whitelist:     commander.whitelist,
  sourceMap:     commander.sourceMaps || commander.sourceMapsInline,
  modules:       commander.modules
};

var fn;

if (commander.outDir) {
  fn = require("./dir");
} else {
  fn = require("./file");
}

fn(commander, filenames, exports.opts);
