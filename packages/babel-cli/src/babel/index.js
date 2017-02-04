#!/usr/bin/env node

const fs         = require("fs");
const commander  = require("commander");
const kebabCase  = require("lodash/kebabCase");
const options    = require("babel-core").options;
const util       = require("babel-core").util;
const uniq       = require("lodash/uniq");
const glob       = require("glob");

Object.keys(options).forEach(function (key) {
  const option = options[key];
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

  const desc = [];
  if (option.deprecated) desc.push("[DEPRECATED] " + option.deprecated);
  if (option.description) desc.push(option.description);

  commander.option(arg, desc.join(" "));
});

/* eslint-disable max-len */
commander.option("-x, --extensions [extensions]", "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx]");
commander.option("-w, --watch", "Recompile files on changes");
commander.option("--skip-initial-build", "Do not compile files before watching");
commander.option("-o, --out-file [out]", "Compile all input files into a single file");
commander.option("-d, --out-dir [out]", "Compile an input directory of modules into an output directory");
commander.option("-D, --copy-files", "When compiling a directory copy over non-compilable files");
commander.option("-q, --quiet", "Don't log anything");
/* eslint-enable max-len */

const pkg = require("../../package.json");
commander.version(pkg.version + " (babel-core " + require("babel-core").version + ")");
commander.usage("[options] <files ...>");
commander.parse(process.argv);

//

if (commander.extensions) {
  commander.extensions = util.arrayify(commander.extensions);
}

//

const errors = [];

let filenames = commander.args.reduce(function (globbed, input) {
  let files = glob.sync(input);
  if (!files.length) files = [input];
  return globbed.concat(files);
}, []);

filenames = uniq(filenames);

filenames.forEach(function (filename) {
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

if (commander.skipInitialBuild && !commander.watch) {
  errors.push("--skip-initial-build requires --watch");
}

if (errors.length) {
  console.error(errors.join(". "));
  process.exit(2);
}

//

const opts = exports.opts = {};

Object.keys(options).forEach(function (key) {
  const opt = options[key];
  if (commander[key] !== undefined && commander[key] !== opt.default) {
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
