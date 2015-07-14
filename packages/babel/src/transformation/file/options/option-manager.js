import { validateOption, normaliseOptions } from "./index";
import stripJsonComments from "strip-json-comments";
import isAbsolute from "path-is-absolute";
import pathExists from "path-exists";
import clone from "lodash/lang/clone";
import merge from "../../../helpers/merge";
import config from "./config";
import path from "path";
import fs from "fs";

var existsCache = {};
var jsonCache   = {};

const BABELIGNORE_FILENAME = ".babelignore";
const BABELRC_FILENAME     = ".babelrc";
const PACKAGE_FILENAME     = "package.json";

function exists(filename) {
  var cached = existsCache[filename];
  if (cached != null) {
    return cached;
  } else {
    return existsCache[filename] = pathExists.sync(filename);
  }
}

export default class OptionManager {
  constructor(log, pipeline) {
    this.resolvedConfigs = [];
    this.options         = OptionManager.createBareOptions();
    this.pipeline        = pipeline;
    this.log             = log;
  }

  /**
   * [Please add a description.]
   */

  static createBareOptions() {
    var opts = {};

    for (var key in config) {
      var opt = config[key];
      opts[key] = clone(opt.default);
    }

    return opts;
  }

  /**
   * [Please add a description.]
   */

  addConfig(loc, key?) {
    if (this.resolvedConfigs.indexOf(loc) >= 0) return;

    var content = fs.readFileSync(loc, "utf8");
    var opts;

    try {
      opts = jsonCache[content] = jsonCache[content] || JSON.parse(stripJsonComments(content));
      if (key) opts = opts[key];
    } catch (err) {
      err.message = `${loc}: ${err.message}`;
      throw err;
    }

    this.mergeOptions(opts, loc);
    this.resolvedConfigs.push(loc);
  }

  /**
   * [Please add a description.]
   */

  mergeOptions(opts, alias = "foreign") {
    if (!opts) return;

    for (let key in opts) {
      if (key[0] === "_") continue;

      let option = config[key];

      // check for an unknown option
      if (!option) this.log.error(`Unknown option: ${alias}.${key}`, ReferenceError);
    }

    // normalise options
    normaliseOptions(opts);

    // merge them into this current files options
    merge(this.options, opts);
  }

  /**
   * [Please add a description.]
   */

  addIgnoreConfig(loc) {
    var file  = fs.readFileSync(loc, "utf8");
    var lines = file.split("\n");

    lines = lines.map(function (line) {
      return line.replace(/#(.*?)$/, "").trim();
    }).filter((line) => !!line);

    console.log(lines);

    this.mergeOptions({ ignore: lines }, loc);
  }

  /**
   * Description
   */

  findConfigs(loc) {
    if (!loc) return;

    if (!isAbsolute(loc)) {
      loc = path.join(process.cwd(), loc);
    }

    while (loc !== (loc = path.dirname(loc))) {
      if (this.options.breakConfig) return;

      var configLoc = path.join(loc, BABELRC_FILENAME);
      if (exists(configLoc)) this.addConfig(configLoc);

      var pkgLoc = path.join(loc, PACKAGE_FILENAME);
      if (exists(pkgLoc)) this.addConfig(pkgLoc, "babel");

      var ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
      if (exists(ignoreLoc)) this.addIgnoreConfig(ignoreLoc);
    }
  }

  /**
   * [Please add a description.]
   */

  normaliseOptions() {
    var opts = this.options;

    for (let key in config) {
      var option = config[key];
      var val    = opts[key];

      // optional
      if (!val && option.optional) continue;

      // deprecated
      if (this.log && val && option.deprecated) {
        this.log.deprecate(`Deprecated option ${key}: ${option.deprecated}`);
      }

      // validate
      if (this.pipeline && val) {
        val = validateOption(key, val, this.pipeline);
      }

      // aaliases
      if (option.alias) {
        opts[option.alias] = opts[option.alias] || val;
      } else {
        opts[key] = val;
      }
    }
  }

  /**
   * [Please add a description.]
   */

  init(opts) {
    this.mergeOptions(opts, "direct");

    // babelrc option
    if (opts.babelrc) {
      for (var loc of (opts.babelrc: Array)) this.addConfig(loc);
    }

    // resolve all .babelrc files
    this.findConfigs(opts.filename);

    // merge in env
    var envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (this.options.env) {
      this.mergeOptions(this.options.env[envKey], `direct.env.${envKey}`);
    }

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  }
}
