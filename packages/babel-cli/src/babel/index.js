#!/usr/bin/env node
/* eslint max-len: 0 */

require("babel-core");

let pathExists = require("path-exists");
let commander  = require("commander");
let kebabCase  = require("lodash.kebabcase");
let options    = require("babel-core").options;
let util       = require("babel-core").util;
let uniq       = require("lodash.uniq");
let each       = require("lodash.foreach");
let glob       = require("glob");

each(options, function (option, key) {
  if (option.hidden) return;

  let arg = kebabCase(key);

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

  let desc = [];
  if (option.deprecated) desc.push("[DEPRECATED] " + option.deprecated);
  if (option.description) desc.push(option.description);

  commander.option(arg, desc.join(" "));
});

commander.option("-x, --extensions [extensions]", "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx]");
commander.option("-w, --watch", "Recompile files on changes");
commander.option("--skip-initial-build", "Do not compile files before watching");
commander.option("-o, --out-file [out]", "Compile all input files into a single file");
commander.option("-d, --out-dir [out]", "Compile an input directory of modules into an output directory");
commander.option("-D, --copy-files", "When compiling a directory copy over non-compilable files");
commander.option("-q, --quiet", "Don't log anything");

let pkg = require("../../package.json");
commander.version(pkg.version + " (babel-core " + require("babel-core").version + ")");
commander.usage("[options] <files ...>");
commander.parse(process.argv);

//

if (commander.extensions) {
  commander.extensions = util.arrayify(commander.extensions);
}

//

let errors = [];

let filenames = commander.args.reduce(function (globbed, input) {
  let files = glob.sync(input);
  if (!files.length) files = [input];
  return globbed.concat(files);
}, []);

filenames = uniq(filenames);

each(filenames, function (filename) {
  if (!pathExists.sync(filename)) {
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

if (commander.skipInitialBuild && !commander.watch) {
  errors.push("--skip-initial-build requires --watch");
}

if (errors.length) {
  console.error(errors.join(". "));
  process.exit(2);
}

//

let opts = exports.opts = {};

each(options, function (opt, key) {
  if (commander[key] !== undefined) {
    opts[key] = commander[key];
  }
});

opts.ignore = util.arrayify(opts.ignore, util.regexify);

if (opts.only) {
  opts.only = util.arrayify(opts.only, util.regexify);
}

let fn;

if (commander.outDir) {
  fn = require("./dir");
} else {
  fn = require("./file");
}

fn(commander, filenames, exports.opts);
