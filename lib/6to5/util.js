"use strict";

require("./patch");

var estraverse = require("estraverse");
var codeFrame  = require("./helpers/code-frame");
var traverse   = require("./traverse");
var debug      = require("debug");
var acorn      = require("acorn-6to5");
var path       = require("path");
var util       = require("util");
var fs         = require("fs");
var t          = require("./types");
var each       = require("lodash/collection/each");
var isNumber   = require("lodash/lang/isNumber");
var isString   = require("lodash/lang/isString");
var isRegExp   = require("lodash/lang/isRegExp");
var isEmpty    = require("lodash/lang/isEmpty");
var clone      = require("lodash/lang/clone");
var cloneDeep  = require("lodash/lang/cloneDeep");
var has        = require("lodash/object/has");
var contains   = require("lodash/collection/contains");

exports.inherits = util.inherits;

exports.debug = debug("6to5");

exports.canCompile = function (filename, altExts) {
  var exts = altExts || exports.canCompile.EXTENSIONS;
  var ext = path.extname(filename);
  return contains(exts, ext);
};

exports.canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

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

exports.pushMutatorMap = function (mutatorMap, key, kind, computed, method) {
  var alias;

  if (t.isIdentifier(key)) {
    alias = key.name;
    if (computed) alias = "computed:" + alias;
  } else if (t.isLiteral(key)) {
    alias = String(key.value);
  } else {
    alias = JSON.stringify(traverse.removeProperties(cloneDeep(key)));
  }

  var map;
  if (has(mutatorMap, alias)) {
    map = mutatorMap[alias];
  } else {
    map = {};
  }
  mutatorMap[alias] = map;

  map._key = key;
  if (computed) {
    map._computed = true;
  }

  map[kind] = method;
};

exports.buildDefineProperties = function (mutatorMap) {
  var objExpr = t.objectExpression([]);

  each(mutatorMap, function (map) {
    var mapNode = t.objectExpression([]);

    var propNode = t.property("init", map._key, mapNode, map._computed);

    if (!map.get && !map.set) {
      map.writable = t.literal(true);
    }

    map.enumerable = t.literal(true);
    map.configurable = t.literal(true);

    each(map, function (node, key) {
      if (key[0] === "_") return;

      node = clone(node);
      var inheritNode = node;
      if (t.isMethodDefinition(node)) node = node.value;

      var prop = t.property("init", t.identifier(key), node);
      t.inheritsComments(prop, inheritNode);
      t.removeComments(inheritNode);
      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
};

var templateVisitor = {
  enter: function (node, parent, scope, context, nodes) {
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

exports.normaliseAst = function (ast, comments, tokens) {
  if (ast && ast.type === "Program") {
    return t.file(ast, comments || [], tokens || []);
  } else {
    throw new Error("Not a valid ast?");
  }
};

exports.parse = function (opts, code, callback) {
  try {
    var comments = [];
    var tokens   = [];

    var ast = acorn.parse(code, {
      allowImportExportEverywhere: opts.allowImportExportEverywhere,
      allowReturnOutsideFunction:  true,
      ecmaVersion:                 opts.experimental ? 7 : 6,
      playground:                  opts.playground,
      strictMode:                  true,
      onComment:                   comments,
      locations:                   true,
      onToken:                     tokens,
      ranges:                      true
    });

    estraverse.attachComments(ast, comments, tokens);

    ast = exports.normaliseAst(ast, comments, tokens);

    if (callback) {
      return callback(ast);
    } else {
      return ast;
    }
  } catch (err) {
    if (!err._6to5) {
      err._6to5 = true;
      var message = opts.filename + ": " + err.message;

      var loc = err.loc;
      if (loc) {
        var frame = codeFrame(code, loc.line, loc.column + 1);
        message += frame;
      }

      if (err.stack) err.stack = err.stack.replace(err.message, message);
      err.message = message;
    }

    throw err;
  }
};

exports.parseTemplate = function (loc, code) {
  var ast = exports.parse({ filename: loc }, code).program;
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
