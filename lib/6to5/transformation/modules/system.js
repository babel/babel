module.exports = SystemFormatter;

var DefaultFormatter = require("./_default");
var traverse         = require("../../traverse");
var util             = require("../../util");
var t                = require("../../types");
var _                = require("lodash");

var SETTER_MODULE_NAMESPACE        = t.identifier("m");
var PRIVATE_MODULE_NAME_IDENTIFIER = t.identifier("__moduleName");
var NULL_SETTER                    = t.literal(null);

function SystemFormatter(file) {
  DefaultFormatter.call(this, file, true);

  this.exportedStatements = [];
  this.moduleDependencies = {};
  this.importedVariables  = {};
  this.moduleNameLiteral  = t.literal(this.getModuleName());
  this.exportIdentifier   = file.generateUidIdentifier("export");
}

util.inherits(SystemFormatter, DefaultFormatter);

SystemFormatter.prototype.importDeclaration =
SystemFormatter.prototype.exportDeclaration = function (node, nodes) {
  nodes.push(node);
};

SystemFormatter.prototype.importSpecifier =
SystemFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  if (!nodes.length) nodes.push(node);
};

SystemFormatter.prototype._makeExportStatements = function (args) {
  return t.expressionStatement(t.callExpression(this.exportIdentifier, args));
};

SystemFormatter.prototype.transform = function (ast) {
  var self = this;

  // Post extraction of the import/export declaration
  traverse(ast, {
    enter: function (node) {
      var replacementNode = null;

      /**
       * Process the current node with an extractor.
       *
       * @param {Function} extractor Extract the node data
       * @returns {*} Can be a `node` (for replacement), undefined (for removing) or false.
       */

      function processTheNode(extractor) {
        var result = extractor.call(self, node);
        result = (result === undefined) ? [] : result;
        replacementNode = result || replacementNode;
        return !!replacementNode;
      }

      _.some([
        // Import
        SystemFormatter.prototype._extractImportSpecifiers,
        SystemFormatter.prototype._extractImport,

        // Export
        SystemFormatter.prototype._extractExportDefault,
        SystemFormatter.prototype._extractExportVariableDeclaration,
        SystemFormatter.prototype._extractExportFunctionDeclaration,
        SystemFormatter.prototype._extractExportSpecifiers
      ], processTheNode);

      return replacementNode;
    }
  });

  // Other
  this._prependImportVariables(ast);
  this._prependPrivateModuleName(ast);
  this._appendModuleReturnStatement(ast);
  this._wrapInSystemRegisterCallExpression(ast);
};

// Import extraction

SystemFormatter.prototype._extractImportSpecifiers = function (node) {
  var self = this;

  if (!(t.isImportDeclaration(node) && node.specifiers && node.specifiers.length)) {
    return false;
  }

  _.each(node.specifiers, function (specifier) {
    var variableName = t.getSpecifierName(specifier);

    var right = SETTER_MODULE_NAMESPACE;
    if (!t.isImportBatchSpecifier(specifier)) {
      right = t.memberExpression(right, specifier.id);
    }
    self.importedVariables[variableName.name] = true;
    self._addImportStatement(node.source.value, t.expressionStatement(
      t.assignmentExpression("=", variableName, right)
    ));

  });
};

SystemFormatter.prototype._extractImport = function (node) {
  if (!t.isImportDeclaration(node)) {
    return false;
  }

  this._addImportStatement(node.source.value);
};

// Export extraction

SystemFormatter.prototype._extractExportDefault = function (node) {
  if (!(t.isExportDeclaration(node) && node.default)) {
    return false;
  }

  var declar = node.declaration;
  var returnNode;

  if (t.isFunction(declar)) {
    if (!declar.id) {
      declar.id = this.file.generateUidIdentifier("anonymous");
    }
    returnNode = t.toStatement(declar);
    declar = declar.id;
  }

  this._addToExportStatements("default", declar);

  return returnNode;
};

SystemFormatter.prototype._extractExportVariableDeclaration = function (node) {
  var self   = this;
  var declar = node.declaration;

  if (!(t.isExportDeclaration(node) && t.isVariableDeclaration(declar))) {
    return false;
  }

  function separateDeclarationAndInit(memo, varDeclar) {
    memo.varDeclaration.push(_.omit(varDeclar, "init"));
    self._addToExportStatements(varDeclar.id.name, t.assignmentExpression("=", varDeclar.id, varDeclar.init));
    return memo;
  }

  var declarationSeparation = _.reduce(
    declar.declarations,
    separateDeclarationAndInit,
    { varDeclaration: [], varInitialization: [] }
  );

  return _.assign(declar, { declarations: declarationSeparation.varDeclaration });
};

SystemFormatter.prototype._extractExportFunctionDeclaration = function (node) {
  var declar = node.declaration;

  if (!(t.isExportDeclaration(node) && t.isFunctionDeclaration(declar))) {
    return false;
  }
  this._addToExportStatements(declar.id.name, declar.id);
  return declar;

};

SystemFormatter.prototype._extractExportSpecifiers = function (node) {
  var self = this;

  if (!(t.isExportDeclaration(node) && node.specifiers)) {
    return false;
  }

  _.each(node.specifiers, function (specifier) {
    // Run each, break when one is true.
    _.some([
      SystemFormatter.prototype._extractExportBatch,
      SystemFormatter.prototype._extractExportFrom,
      SystemFormatter.prototype._extractExportNamed
    ], function (extractor) {
      var result = extractor.call(self, specifier, node);
      return result === undefined || result;
    });
  });

  // Note: here we don't care about the node replacement.
  // The current node will always be removed.
  // So no return.
};

SystemFormatter.prototype._extractExportBatch = function (specifier, node) {
  if (!(node.source && t.isExportBatchSpecifier(specifier))) {
    return false;
  }

  var exportBatch = this._makeExportWildcard(SETTER_MODULE_NAMESPACE);
  this._addImportStatement(node.source.value, exportBatch);
};

SystemFormatter.prototype._extractExportFrom = function (specifier, node) {
  // Weak test here...
  if (!(node.source)) {
    return false;
  }

  var variableName = t.getSpecifierName(specifier);

  var target = t.memberExpression(
    SETTER_MODULE_NAMESPACE,
    specifier.id
  );

  var exportSelection = this._makeExportStatements([
    t.literal(variableName.name), target
  ]);

  this._addImportStatement(node.source.value, exportSelection);
};

SystemFormatter.prototype._extractExportNamed = function (specifier) {
  // Last case...
  // Dunno what to test here...

  var variableName = t.getSpecifierName(specifier);
  this._addToExportStatements(variableName.name, specifier.id);
};

// Utils collection handler

SystemFormatter.prototype._addToExportStatements = function (name, identifier) {
  this.exportedStatements.push(
    this._makeExportStatements([t.literal(name), identifier])
  );
};

SystemFormatter.prototype._makeExportWildcard = function (objectIdentifier) {
  var leftIdentifier = t.identifier("i");
  var valIdentifier  = t.memberExpression(objectIdentifier, leftIdentifier, true);

  var left = t.variableDeclaration("var", [
    t.variableDeclarator(leftIdentifier)
  ]);

  var right = objectIdentifier;

  var block = t.blockStatement([
    this._makeExportStatements([leftIdentifier, valIdentifier])
  ]);

  return t.forInStatement(left, right, block);
};

SystemFormatter.prototype._addImportStatement = function (name, importStatement) {
  this.moduleDependencies[name] = this.moduleDependencies[name] || [];
  importStatement && this.moduleDependencies[name].push(importStatement);
};

// Additional body content

SystemFormatter.prototype._prependImportVariables = function (ast) {
  var declaredSetters = _(this.importedVariables).keys().map(function (name) {
    return _.compose(t.variableDeclarator, t.identifier)(name);
  }).value();

  if (declaredSetters.length) {
    ast.program.body.splice(1, 0, t.variableDeclaration("var", declaredSetters));
  }
};

SystemFormatter.prototype._prependPrivateModuleName = function (ast) {
  // generate the __moduleName variable
  var moduleNameVariableNode = t.variableDeclaration("var", [
    t.variableDeclarator(
      PRIVATE_MODULE_NAME_IDENTIFIER,
      this.moduleNameLiteral
    )
  ]);

  ast.program.body.splice(1, 0, moduleNameVariableNode);
};

SystemFormatter.prototype._buildSetters = function () {
  // generate setters array expression elements
  return _.map(this.moduleDependencies, function (specs) {
    if (!specs.length) {
      return NULL_SETTER;
    }

    return t.functionExpression(
      null, [SETTER_MODULE_NAMESPACE], t.blockStatement(specs)
    );
  });
};

SystemFormatter.prototype._appendModuleReturnStatement = function (ast) {
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

  ast.program.body.push(moduleReturnStatement);
};

SystemFormatter.prototype._wrapInSystemRegisterCallExpression = function (ast) {
  var program = ast.program;
  var body    = program.body;

  var moduleDependencyNames = Object
    .keys(this.moduleDependencies)
    .map(t.literal);

  var runner = util.template("system", {
    MODULE_NAME: this.moduleNameLiteral,
    MODULE_DEPENDENCIES: t.arrayExpression(moduleDependencyNames),
    MODULE_BODY: t.functionExpression(
      null,
      [this.exportIdentifier],
      t.blockStatement(body)
    )
  }, true);

  program.body = [runner];
};
