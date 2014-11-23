module.exports = RegisterFormatter;

var util = require("../../util");
var t = require("../../types");
var _ = require("lodash");

var EXPORT_IDENTIFIER = t.identifier("$__export");
var DEFAULT_IDENTIFIER = t.identifier("default");
var SETTER_MODULE_NAMESPACE = t.identifier("m");
var NULL_SETTER = {
  "type": "Literal",
  "value": null,
  "raw": "null"
};

function RegisterFormatter(file) {
  this.file = file;
  this.importedModule = {};
  this.exportedStatements = [];
}

RegisterFormatter.prototype.transform = function(ast) {
  var program = ast.program;
  var body = program.body;

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
    .pluck("VARIABLE_NAME")
    .pluck("name")
    .uniq()
    .map(t.identifier)
    .map(function(name) {
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
      [EXPORT_IDENTIFIER],
      t.blockStatement(body)
    )
  });

  program.body = [t.expressionStatement(runner)];
};


RegisterFormatter.prototype._buildSetters = function() {
  // generate setters array expression elements
  return _(this.importedModule)
    .map(function(specifications) {

      if (!specifications.length) {
        return NULL_SETTER;
      }

      var expressionStatements = _.map(specifications, function(specification) {
        return t.expressionStatement(
          t.assignmentExpression(
            "=",
            specification.VARIABLE_NAME,
            specification.IS_BATCH ?
              SETTER_MODULE_NAMESPACE :
              t.memberExpression(
                SETTER_MODULE_NAMESPACE,
                specification.KEY
              )
          )
        );
      });

      return t.functionExpression(
        null, [SETTER_MODULE_NAMESPACE], t.blockStatement(expressionStatements)
      );
    }.bind(this))
    .value();
};

RegisterFormatter.prototype.import = function(node) {
  var MODULE_NAME = node.source.value;
  this.importedModule[MODULE_NAME] =
    this.importedModule[MODULE_NAME] || [];
};

RegisterFormatter.prototype.importSpecifier = function(specifier, node) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (specifier.default) {
    specifier.id = DEFAULT_IDENTIFIER;
  }

  var MODULE_NAME = node.source.value;

  this.importedModule[MODULE_NAME] =
    this.importedModule[MODULE_NAME] || [];

  this.importedModule[MODULE_NAME].push(
    {
      VARIABLE_NAME: variableName,
      KEY: specifier.id,
      IS_BATCH: specifier.type === "ImportBatchSpecifier"
    }
  );
};

RegisterFormatter.prototype._export = function(name, identifier) {
  this.exportedStatements.push(t.expressionStatement(
    t.callExpression(EXPORT_IDENTIFIER, [t.literal(name), identifier])
  ));
};

RegisterFormatter.prototype.export = function(node, nodes) {

  var declar = node.declaration;
  var variableName, identifier;

  if (node.default) {
    // export default foo
    variableName = DEFAULT_IDENTIFIER.name;
    if (t.isClass(declar) || t.isFunction(declar)) {

      if (!declar.id) {
        declar.id = this.file.generateUidIdentifier("anonymousFct");
      }

      nodes.push(t.toStatement(declar));
      declar = declar.id;

    }

    identifier = declar;

  } else if (t.isVariableDeclaration(declar)) {
    // export var foo
    variableName = declar.declarations[0].id.name;
    identifier = declar.declarations[0].id;

    nodes.push((declar));

  } else {
    // export function foo () {}
    variableName = declar.id.name;
    identifier = declar.id;

    nodes.push(declar);

  }

  this._export(variableName, identifier);

};

RegisterFormatter.prototype.exportSpecifier = function(specifier, node) {
  var variableName = t.getSpecifierName(specifier);

  if (node.source) {

    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      var exportIdentifier = t.identifier("exports");
      this.exportedStatements.push(
        t.variableDeclaration("var",
          [
            t.variableDeclarator(
              exportIdentifier,
              EXPORT_IDENTIFIER
            )
          ]
        )
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
