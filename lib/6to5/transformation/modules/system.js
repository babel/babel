module.exports = SystemFormatter;

var util = require("../../util");
var t    = require("../../types");
var _    = require("lodash");

var SETTER_MODULE_NAMESPACE = t.identifier("m");
var DEFAULT_IDENTIFIER      = t.identifier("default");
var NULL_SETTER             = t.literal(null);

function SystemFormatter(file) {
  this.exportedStatements = [];
  this.importedModule     = {};

  this.exportIdentifier   = file.generateUidIdentifier("export");
  this.file               = file;
}

SystemFormatter.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // extract the module name
  var moduleName = this.file.opts.filename
    .replace(/^.*\//, "").replace(/\..*$/, "");

  // build an array of module names
  var dependencies = Object.keys(this.importedModule).map(t.literal);

  // generate the __moduleName variable
  var moduleNameVariableNode = t.variableDeclaration("var", [
    t.variableDeclarator(
      t.identifier("__moduleName"),
      t.literal(moduleName)
    )
  ]);
  body.splice(1, 0, moduleNameVariableNode);

  // generate an array of import variables

  var declaredSetters = _(this.importedModule)
    .map()
    .flatten()
    .pluck("variableName")
    .pluck("name")
    .uniq()
    .map(t.identifier)
    .map(function (name) {
      return t.variableDeclarator(name);
    })
    .value();

  if (declaredSetters.length) {
    body.splice(2, 0, t.variableDeclaration("var", declaredSetters));
  }

  // generate the execute function expression
  var executeFunctionExpression = t.functionExpression(
    null, [], t.blockStatement(this.exportedStatements)
  );

  // generate the execute function expression
  var settersArrayExpression = t.arrayExpression(this._buildSetters());

  // generate the return statement
  var moduleReturnStatement = t.returnStatement(t.objectExpression([
    t.property("init", t.identifier("setters"), settersArrayExpression),
    t.property("init", t.identifier("execute"), executeFunctionExpression)
  ]));
  body.push(moduleReturnStatement);

  // runner
  var runner = util.template("register", {
    MODULE_NAME: t.literal(moduleName),
    MODULE_DEPENDENCIES: t.arrayExpression(dependencies),
    MODULE_BODY: t.functionExpression(
      null,
      [this.exportIdentifier],
      t.blockStatement(body)
    )
  });

  program.body = [t.expressionStatement(runner)];
};

SystemFormatter.prototype._buildSetters = function () {
  // generate setters array expression elements
  return _.map(this.importedModule, function (specs) {
    if (!specs.length) {
      return NULL_SETTER;
    }

    var expressionStatements = _.map(specs, function (spec) {
      var right = SETTER_MODULE_NAMESPACE;
      if (!spec.isBatch) {
        right = t.memberExpression(right, spec.key);
      }

      return t.expressionStatement(
        t.assignmentExpression("=", spec.variableName, right
        )
      );
    });

    return t.functionExpression(
      null, [SETTER_MODULE_NAMESPACE], t.blockStatement(expressionStatements)
    );
  });
};

SystemFormatter.prototype.import = function (node) {
  var MODULE_NAME = node.source.value;
  this.importedModule[MODULE_NAME] = this.importedModule[MODULE_NAME] || [];
};

SystemFormatter.prototype.importSpecifier = function (specifier, node) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (specifier.default) {
    specifier.id = DEFAULT_IDENTIFIER;
  }

  var MODULE_NAME = node.source.value;

  this.importedModule[MODULE_NAME] = this.importedModule[MODULE_NAME] || [];

  this.importedModule[MODULE_NAME].push({
    variableName: variableName,
    isBatch:      specifier.type === "ImportBatchSpecifier",
    key:          specifier.id
  });
};

SystemFormatter.prototype._export = function (name, identifier) {
  this.exportedStatements.push(t.expressionStatement(
    t.callExpression(this.exportIdentifier, [t.literal(name), identifier])
  ));
};

SystemFormatter.prototype.export = function (node, nodes) {
  var declar = node.declaration;
  var variableName, identifier;

  if (node.default) {
    // export default foo
    variableName = DEFAULT_IDENTIFIER.name;
    if (t.isClass(declar) || t.isFunction(declar)) {
      if (!declar.id) {
        declar.id = this.file.generateUidIdentifier("anonymous");
      }

      nodes.push(t.toStatement(declar));
      declar = declar.id;
    }

    identifier = declar;
  } else if (t.isVariableDeclaration(declar)) {
    // export var foo
    variableName = declar.declarations[0].id.name;
    identifier = declar.declarations[0].id;

    nodes.push(declar);
  } else {
    // export function foo () {}
    variableName = declar.id.name;
    identifier = declar.id;

    nodes.push(declar);
  }

  this._export(variableName, identifier);
};

SystemFormatter.prototype.exportSpecifier = function (specifier, node) {
  var variableName = t.getSpecifierName(specifier);

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      var exportIdentifier = t.identifier("exports");
      this.exportedStatements.push(
        t.variableDeclaration("var", [
          t.variableDeclarator(exportIdentifier, this.exportIdentifier)
        ])
      );

      this.exportedStatements.push(util.template("exports-wildcard", {
        OBJECT: t.identifier(node.source.value)
      }, true));
    } else {
      // export { foo } from "test";
      this._export(variableName.name, t.memberExpression(
        t.identifier(node.source.value),
        specifier.id
      ));
    }
  } else {
    // export { foo };
    this._export(variableName.name, specifier.id);
  }
};
