module.exports = AMDFormatter;

var CommonJSFormatter = require("./common");
var util              = require("../util");
var b                 = require("ast-types").builders;
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

  var names = [];
  _.each(this.ids, function (id, name) {
    names.push(b.literal(name));
  });
  names = b.arrayExpression(names);

  // add exports

  body.unshift(b.variableDeclaration("var", [
    b.variableDeclarator(b.identifier("exports"), b.objectExpression([]))
  ]));
  body.push(b.returnStatement(b.identifier("exports")));

  // build up define container

  var container = b.functionExpression(null, _.values(this.ids), b.blockStatement(body));
  var call = b.callExpression(b.identifier("define"), [names, container]);

  program.body = [b.expressionStatement(call)];
};

AMDFormatter.prototype._push = function (node) {
  var id  = node.source.value;
  var ids = this.ids;

  if (ids[id]) {
    return ids[id];
  } else {
    return this.ids[id] = b.identifier(this.file.generateUid(id));
  }
};

AMDFormatter.prototype.import = function (node) {
  this._push(node);
};

AMDFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var key = util.getSpecifierName(specifier);
  var id  = specifier.id;

  // import foo from "foo";
  if (specifier.default) {
    id = b.identifier("default");
  }

  var ref;

  if (specifier.type === "ImportBatchSpecifier") {
    // import * as bar from "foo";
    ref = this._push(node);
  } else {
    // import foo from "foo";
    ref = b.memberExpression(this._push(node), id, false);
  }

  nodes.push(b.variableDeclaration("var", [
    b.variableDeclarator(key, ref)
  ]));
};

AMDFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  var variableName = util.getSpecifierName(specifier);

  if (node.source) {
    var object = this._push(node);
    if (specifier.type === "ExportBatchSpecifier") {
      // export * from "foo";
      nodes.push(util.template("exports-wildcard", {
        OBJECT: object
      }, true));
    } else {
      // export { foo } from "test";
      nodes.push(util.template("exports-assign-key", {
        VARIABLE_NAME: variableName.name,
        OBJECT:        object,
        KEY:           specifier.id
      }, true));
    }
  } else {
    // export { foo };
    nodes.push(util.template("exports-assign", {
      VALUE: specifier.id,
      KEY:   variableName
    }, true));
  }
};
