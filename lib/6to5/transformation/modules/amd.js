module.exports = AMDFormatter;

var CommonJSFormatter = require("./common");
var util              = require("../../util");
var t                 = require("../../types");
var _                 = require("lodash");

function AMDFormatter(file) {
  this.file = file;
  this.ids  = {};
}

util.inherits(AMDFormatter, CommonJSFormatter);

AMDFormatter.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // build an array of module names

  var names = [t.literal("exports")];
  _.each(this.ids, function (id, name) {
    names.push(t.literal(name));
  });
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

AMDFormatter.prototype.getModuleName = function () {
  if (this.file.opts.amdModuleIds) {
    return CommonJSFormatter.prototype.getModuleName.apply(this, arguments);
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

AMDFormatter.prototype.import = function (node) {
  this._push(node);
};

AMDFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var key = t.getSpecifierName(specifier);
  var id  = specifier.id;

  // import foo from "foo";
  if (specifier.default) {
    id = t.identifier("default");
  }

  var ref;

  if (t.isImportBatchSpecifier(specifier)) {
    // import * as bar from "foo";
    ref = this._push(node);
  } else {
    // import foo from "foo";
    ref = t.memberExpression(this._push(node), id, false);

    if (specifier.default) {
      ref = t.callExpression(this.file.addDeclaration("interop-require"), [ref]);
    }
  }

  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(key, ref)
  ]));
};

AMDFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  var self = this;
  return this._exportSpecifier(function () {
    return self._push(node);
  }, specifier, node, nodes);
};
