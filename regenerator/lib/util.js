/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;

exports.defaults = function(obj) {
  var len = arguments.length;
  var extension;

  for (var i = 1; i < len; ++i) {
    if ((extension = arguments[i])) {
      for (var key in extension) {
        if (hasOwn.call(extension, key) && !hasOwn.call(obj, key)) {
          obj[key] = extension[key];
        }
      }
    }
  }

  return obj;
};

exports.runtimeProperty = function(name) {
  return b.memberExpression(
    b.identifier("regeneratorRuntime"),
    b.identifier(name),
    false
  );
};

// Inspired by the isReference function from ast-util:
// https://github.com/eventualbuddha/ast-util/blob/9bf91c5ce8/lib/index.js#L466-L506
exports.isReference = function(path, name) {
  var node = path.value;

  if (!n.Identifier.check(node)) {
    return false;
  }

  if (name && node.name !== name) {
    return false;
  }

  var parent = path.parent.value;

  switch (parent.type) {
  case "VariableDeclarator":
    return path.name === "init";

  case "MemberExpression":
    return path.name === "object" || (
      parent.computed && path.name === "property"
    );

  case "FunctionExpression":
  case "FunctionDeclaration":
  case "ArrowFunctionExpression":
    if (path.name === "id") {
      return false;
    }

    if (path.parentPath.name === "params" &&
        parent.params === path.parentPath.value &&
        parent.params[path.name] === node) {
      return false;
    }

    return true;

  case "ClassDeclaration":
  case "ClassExpression":
    return path.name !== "id";

  case "CatchClause":
    return path.name !== "param";

  case "Property":
  case "MethodDefinition":
    return path.name !== "key";

  case "ImportSpecifier":
  case "ImportDefaultSpecifier":
  case "ImportNamespaceSpecifier":
  case "LabeledStatement":
    return false;

  default:
    return true;
  }
};
