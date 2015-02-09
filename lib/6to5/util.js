"use strict";

require("./patch");

var cloneDeep  = require("lodash/lang/cloneDeep");
var contains   = require("lodash/collection/contains");
var traverse   = require("./traversal");
var isNumber   = require("lodash/lang/isNumber");
var isString   = require("lodash/lang/isString");
var isRegExp   = require("lodash/lang/isRegExp");
var isEmpty    = require("lodash/lang/isEmpty");
var parse      = require("./helpers/parse");
var debug      = require("debug/node");
var path       = require("path");
var util       = require("util");
var each       = require("lodash/collection/each");
var has        = require("lodash/object/has");
var fs         = require("fs");
var t          = require("./types");

exports.inherits = util.inherits;

exports.debug = debug("6to5");

exports.canCompile = function (filename, altExts) {
  var exts = altExts || exports.canCompile.EXTENSIONS;
  var ext = path.extname(filename);
  return contains(exts, ext);
};

exports.canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

exports.normalisePathSeparator = function (filename) {
  return filename.replace(/\\/g, "/");
};

exports.isInteger = function (i) {
  return isNumber(i) && i % 1 === 0;
};

exports.resolve = function (loc) {
  try {
    return require.resolve(loc);
  } catch (err) {
    return null;
  }
};

exports.trimRight = function (str) {
  return str.replace(/[\n\s]+$/g, "");
};

exports.list = function (val) {
  return val ? val.split(",") : [];
};

exports.regexify = function (val) {
  if (!val) return new RegExp(/.^/);
  if (Array.isArray(val)) val = val.join("|");
  if (isString(val)) return new RegExp(val);
  if (isRegExp(val)) return val;
  throw new TypeError("illegal type for regexify");
};

exports.arrayify = function (val) {
  if (!val) return [];
  if (isString(val)) return exports.list(val);
  if (Array.isArray(val)) return val;
  throw new TypeError("illegal type for arrayify");
};

exports.isAbsolute = function (loc) {
  if (!loc) return false;
  if (loc[0] === "/") return true; // unix
  if (loc[1] === ":" && loc[2] === "\\") return true; // windows
  return false;
};

exports.sourceMapToComment = function (map) {
  var json = JSON.stringify(map);
  var base64 = new Buffer(json).toString("base64");
  return "//# sourceMappingURL=data:application/json;base64," + base64;
};

var templateVisitor = {
  enter: function (node, parent, scope, nodes) {
    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }
    if (t.isIdentifier(node) && has(nodes, node.name)) {
      return nodes[node.name];
    }
  }
};

exports.template = function (name, nodes, keepExpression) {
  var template = exports.templates[name];
  if (!template) throw new ReferenceError("unknown template " + name);

  if (nodes === true) {
    keepExpression = true;
    nodes = null;
  }

  template = cloneDeep(template);

  if (!isEmpty(nodes)) {
    traverse(template, templateVisitor, null, nodes);
  }

  var node = template.body[0];

  if (!keepExpression && t.isExpressionStatement(node)) {
    return node.expression;
  } else {
    return node;
  }
};

exports.repeat = function (width, cha) {
  cha = cha || " ";

  var result = "";
  for (var i = 0; i < width; i++) {
    result += cha;
  }

  return result;
};

exports.parseTemplate = function (loc, code) {
  var ast = parse({ filename: loc }, code).program;
  return traverse.removeProperties(ast);
};

var loadTemplates = function () {
  var templates = {};

  var templatesLoc = __dirname + "/transformation/templates";
  if (!fs.existsSync(templatesLoc)) {
    throw new Error("no templates directory - this is most likely the " +
                    "result of a broken `npm publish`. Please report to " +
                    "https://github.com/6to5/6to5/issues");
  }

  each(fs.readdirSync(templatesLoc), function (name) {
    if (name[0] === ".") return;

    var key  = path.basename(name, path.extname(name));
    var loc  = templatesLoc + "/" + name;
    var code = fs.readFileSync(loc, "utf8");

    templates[key] = exports.parseTemplate(loc, code);
  });

  return templates;
};

try {
  exports.templates = require("../../templates.json");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") throw err;

  exports.templates = loadTemplates();
}
