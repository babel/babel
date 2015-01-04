module.exports = AMDFormatter;

var DefaultFormatter = require("./_default");
var util             = require("../../util");
var t                = require("../../types");
var _                = require("lodash");

function AMDFormatter() {
  DefaultFormatter.apply(this, arguments);
  this.ids  = {};
}

util.inherits(AMDFormatter, DefaultFormatter);

AMDFormatter.prototype.buildDependencyLiterals = function () {
  var names = [];
  for (var name in this.ids) {
    names.push(t.literal(name));
  }
  return names;
};

/**
 * Wrap the entire body in a `define` wrapper.
 */

AMDFormatter.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // build an array of module names

  var names = [t.literal("exports")].concat(this.buildDependencyLiterals());
  names = t.arrayExpression(names);

  // build up define container

  var params = _.values(this.ids);
  params.unshift(t.identifier("exports"));

  var container = t.functionExpression(null, params, t.blockStatement(body));

  var defineArgs = [names, container];
  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var call = t.callExpression(t.identifier("define"), defineArgs);

  program.body = [t.expressionStatement(call)];
};

/**
 * Get the AMD module name that we'll prepend to the wrapper
 * to define this module
 */

AMDFormatter.prototype.getModuleName = function () {
  if (this.file.opts.moduleIds) {
    return DefaultFormatter.prototype.getModuleName.apply(this, arguments);
  } else {
    return null;
  }
};

AMDFormatter.prototype._push = function (node) {
  var id  = node.source.value;
  var ids = this.ids;

  if (ids[id]) {
    return ids[id];
  } else {
    return this.ids[id] = this.file.generateUidIdentifier(id);
  }
};

AMDFormatter.prototype.importDeclaration = function (node) {
  this._push(node);
};

AMDFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var key = t.getSpecifierName(specifier);
  var ref = this._push(node);

  if (t.isImportBatchSpecifier(specifier)) {
    // import * as bar from "foo";
  } else if (t.isSpecifierDefault(specifier) && !this.noInteropRequire) {
    // import foo from "foo";
    ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
  } else {
    // import {foo} from "foo";
    ref = t.memberExpression(ref, specifier.id, false);
  }

  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(key, ref)
  ]));
};

AMDFormatter.prototype.exportDeclaration = function (node, nodes) {
  if (node.default) {
    var declar = node.declaration;
    var assign;

    // exports = VALUE;
    var templateName = "exports-default";

    if (t.isFunction(declar) || !this.hasNonDefaultExports) {
      assign = util.template(templateName, {
        VALUE: this._pushStatement(declar, nodes)
      }, true);

      // hoist to the top if this default is a function
      nodes.push(this._hoistExport(declar, assign, 3));
      return;
    } else {
      // this export isn't a function so we can't hoist it to the top so we need to set it
      // at the very end of the file with something like:
      //
      //   module.exports = Object.assign(exports["default"], exports)
      //

      assign = util.template("amd-export-default-assign", true);
      assign._blockHoist = 0;

      nodes.push(assign);
    }
  }

  DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
};

AMDFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  var self = this;
  return this._exportSpecifier(function () {
    return self._push(node);
  }, specifier, node, nodes);
};
