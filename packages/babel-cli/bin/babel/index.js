#!/usr/bin/env node

var moduleFormatters = require("babel-core/lib/babel/transformation/modules");
var commander        = require("commander");
var transform        = require("babel-core").transform;
var kebabCase        = require("lodash/string/kebabCase");
var options          = require("babel-core").options;
var util             = require("babel-core").util;
var uniq             = require("lodash/array/uniq");
var each             = require("lodash/collection/each");
var keys             = require("lodash/object/keys");
var fs               = require("fs");
var glob             = require("glob");

each(options, function (option, key) {
  if (option.hidden) return;

  var arg = kebabCase(key);

  if (option.type !== "boolean") {
    arg += " [" + (option.type || "string") + "]";
  }

  if (option.type === "boolean" && option.default === true) {
    arg = "no-" + arg;
  }

  arg = "--" + arg;

  if (option.shorthand) {
    arg = "-" + option.shorthand + ", " + arg;
  }

  var desc = [];
  if (option.deprecated) desc.push("[DEPRECATED] " + option.deprecated);
  if (option.description) desc.push(option.description);

  commander.option(arg, desc.join(" "));
});

commander.option("-x, --extensions [extensions]", "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx]");
commander.option("-w, --watch", "Recompile files on changes");
commander.option("-o, --out-file [out]", "Compile all input files into a single file");
commander.option("-d, --out-dir [out]", "Compile an input directory of modules into an output directory");
commander.option("-D, --copy-files", "When compiling a directory copy over non-compilable files");

commander.on("--help", function () {
  var outKeys = function (title, obj) {
    console.log("  " + title + ":");
    console.log();

    each(keys(obj).sort(), function (key) {
      if (key[0] === "_") return;

      if (obj[key].metadata && obj[key].metadata.optional) key = "[" + key + "]";

      console.log("    - " + key);
    });

    console.log();
  };

  outKeys("Transformers", transform.pipeline.transformers);
  outKeys("Module formatters", moduleFormatters);
});

var pkg = require("../../package.json");
commander.version(pkg.version);
commander.usage("[options] <files ...>");
commander.parse(process.argv);

//

if (commander.extensions) {
  commander.extensions = util.arrayify(commander.extensions);
}

//

var errors = [];

var filenames = commander.args.reduce(function (globbed, input) {
  var files = glob.sync(input);
  if (!files.length) files = [input];
  return globbed.concat(files);
}, []);

filenames = uniq(filenames);

each(filenames, function (filename) {
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

if (errors.length) {
  console.error(errors.join(". "));
  process.exit(2);
}

//

var opts = exports.opts = {};

each(options, function (opt, key) {
  if (commander[key] !== undefined) {
    opts[key] = commander[key];
  }
});

opts.ignore = util.arrayify(opts.ignore, util.regexify);

if (opts.only) {
  opts.only = util.arrayify(opts.only, util.regexify);
}

var fn;

if (commander.outDir) {
  fn = require("./dir");
} else {
  fn = require("./file");
}

fn(commander, filenames, exports.opts);
