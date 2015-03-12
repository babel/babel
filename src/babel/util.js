import "./patch";

import buildDebug from "debug/node";
import cloneDeep from "lodash/lang/cloneDeep";
import isBoolean from "lodash/lang/isBoolean";
import * as messages from "./messages";
import minimatch from "minimatch";
import contains from "lodash/collection/contains";
import traverse from "./traversal";
import isString from "lodash/lang/isString";
import isRegExp from "lodash/lang/isRegExp";
import isEmpty from "lodash/lang/isEmpty";
import parse from "./helpers/parse";
import path from "path";
import each from "lodash/collection/each";
import has from "lodash/object/has";
import fs from "fs";
import * as t from "./types";

export { inherits, inspect } from "util";

export var debug = buildDebug("babel");

export function canCompile(filename: string, altExts?: Array<string>) {
  var exts = altExts || canCompile.EXTENSIONS;
  var ext = path.extname(filename);
  return contains(exts, ext);
}

canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

export function resolve(loc: string) {
  try {
    return require.resolve(loc);
  } catch (err) {
    return null;
  }
}

export function list(val: string): Array<string> {
  return val ? val.split(",") : [];
}

export function regexify(val: any): RegExp {
  if (!val) return new RegExp(/.^/);
  if (Array.isArray(val)) val = val.join("|");
  if (isString(val)) return minimatch.makeRe(val, { nocase: true });
  if (isRegExp(val)) return val;
  throw new TypeError("illegal type for regexify");
}

export function arrayify(val: any, mapFn?: Function): Array {
  if (!val) return [];
  if (isBoolean(val)) return arrayify([val], mapFn);
  if (isString(val)) return arrayify(list(val), mapFn);

  if (Array.isArray(val)) {
    if (mapFn) val = val.map(mapFn);
    return val;
  }

  throw new TypeError("illegal type for arrayify");
}

export function booleanify(val: any): boolean {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}

var templateVisitor = {
  enter(node, parent, scope, nodes) {
    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }
    if (t.isIdentifier(node) && has(nodes, node.name)) {
      this.skip();
      return nodes[node.name];
    }
  }
}

//

export function template(name: string, nodes?: Array<Object>, keepExpression?: boolean): Object {
  var ast = exports.templates[name];
  if (!ast) throw new ReferenceError(`unknown template ${name}`);

  if (nodes === true) {
    keepExpression = true;
    nodes = null;
  }

  ast = cloneDeep(ast);

  if (!isEmpty(nodes)) {
    traverse(ast, templateVisitor, null, nodes);
  }

  if (ast.body.length > 1) return ast.body;

  var node = ast.body[0];

  if (!keepExpression && t.isExpressionStatement(node)) {
    return node.expression;
  } else {
    return node;
  }
}

export function parseTemplate(loc: string, code: string): Object {
  var ast = parse({ filename: loc }, code).program;
  ast = traverse.removeProperties(ast);
  return ast;
}

function loadTemplates() {
  var templates = {};

  var templatesLoc = path.join(__dirname, "transformation/templates");
  if (!fs.existsSync(templatesLoc)) {
    throw new ReferenceError(messages.get("missingTemplatesDirectory"));
  }

  each(fs.readdirSync(templatesLoc), function (name) {
    if (name[0] === ".") return;

    var key  = path.basename(name, path.extname(name));
    var loc  = path.join(templatesLoc, name);
    var code = fs.readFileSync(loc, "utf8");

    templates[key] = parseTemplate(loc, code);
  });

  return templates;
}

try {
  exports.templates = require("../../templates.json");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") throw err;
  exports.templates = loadTemplates();
}
