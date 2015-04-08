import * as messages from "../../messages";
import traverse from "../../traversal";
import extend from "lodash/object/extend";
import object from "../../helpers/object";
import * as util from  "../../util";
import * as t from "../../types";

var remapVisitor = {
  enter(node, parent, scope, formatter) {
    var remap = formatter.internalRemap[node.name];
    if (this.isReferencedIdentifier() && remap) {
      if (!scope.hasBinding(node.name) || scope.bindingIdentifierEquals(node.name, formatter.localImports[node.name])) {
        return remap;
      }
    }

    if (t.isUpdateExpression(node)) {
      var exported = formatter.getExport(node.argument, scope);

      if (exported) {
        this.skip();

        // expand to long file assignment expression
        var assign = t.assignmentExpression(node.operator[0] + "=", node.argument, t.literal(1));

        // remap this assignment expression
        var remapped = formatter.remapExportAssignment(assign, exported);

        // we don't need to change the result
        if (t.isExpressionStatement(parent) || node.prefix) {
          return remapped;
        }

        var nodes = [];
        nodes.push(remapped);

        var operator;
        if (node.operator === "--") {
          operator = "+";
        } else { // "++"
          operator = "-";
        }
        nodes.push(t.binaryExpression(operator, node.argument, t.literal(1)));

        return t.sequenceExpression(nodes);
      }
    }

    if (node._skipModulesRemap) {
      return this.skip();
    }

    if (t.isAssignmentExpression(node) && !node._ignoreModulesRemap) {
      var exported = formatter.getExport(node.left, scope);
      if (exported) {
        this.skip();
        return formatter.remapExportAssignment(node, exported);
      }
    }
  }
};

var importsVisitor = {
  ImportDeclaration: {
    enter(node, parent, scope, formatter) {
      formatter.hasLocalImports = true;
      extend(formatter.localImports, this.getBindingIdentifiers());
    }
  }
};

var exportsVisitor = traverse.explode({
  ExportDeclaration: {
    enter(node, parent, scope, formatter) {
      formatter.hasLocalExports = true;

      var declar = this.get("declaration");
      if (declar.isStatement()) {
        var bindings = declar.getBindingIdentifiers()
        for (var name in bindings) {
          var binding = bindings[name];
          formatter._addExport(name, binding);
        }
      }

      if (this.isExportNamedDeclaration() && node.specifiers) {
        for (var i = 0; i < node.specifiers.length; i++) {
          var specifier = node.specifiers[i];
          var local = specifier.local;
          if (!local) continue;

          formatter._addExport(local.name, specifier.exported);
        }
      }

      if (!t.isExportDefaultDeclaration(node)) {
        var onlyDefault = node.specifiers && node.specifiers.length === 1 && t.isSpecifierDefault(node.specifiers[0]);
        if (!onlyDefault) {
          formatter.hasNonDefaultExports = true;
        }
      }
    }
  }
});

export default class DefaultFormatter {
  constructor(file) {
    this.internalRemap = object();
    this.defaultIds    = object();
    this.scope         = file.scope;
    this.file          = file;
    this.ids           = object();

    this.hasNonDefaultExports = false;

    this.hasLocalExports = false;
    this.hasLocalImports = false;

    this.localExports = object();
    this.localImports = object();

    this.getLocalExports();
    this.getLocalImports();
  }

  transform() {
    this.remapAssignments();
  }

  doDefaultExportInterop(node) {
    return (t.isExportDefaultDeclaration(node) || t.isSpecifierDefault(node)) && !this.noInteropRequireExport && !this.hasNonDefaultExports;
  }

  getLocalExports() {
    this.file.path.traverse(exportsVisitor, this);
  }

  getLocalImports() {
    this.file.path.traverse(importsVisitor, this);
  }

  remapAssignments() {
    if (this.hasLocalExports || this.hasLocalImports) {
      this.file.path.traverse(remapVisitor, this);
    }
  }

  remapExportAssignment(node, exported) {
    var assign = node;

    for (var i = 0; i < exported.length; i++) {
      assign = t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier("exports"), exported[i]),
        assign
      );
    }

    return assign;
  }

  _addExport(name, exported) {
    var info = this.localExports[name] ||= {
      binding: this.scope.getBindingIdentifier(name),
      exported: []
    };
    info.exported.push(exported);
  }

  getExport(node, scope) {
    if (!t.isIdentifier(node)) return;

    var local = this.localExports[node.name];
    if (local && local.binding === scope.getBindingIdentifier(node.name)) {
      return local.exported;
    }
  }

  getModuleName() {
    var opts = this.file.opts;
    if (opts.moduleId) return opts.moduleId;

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot) {
      // remove sourceRoot from filename
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    if (!opts.keepModuleIdExtensions) {
      // remove extension
      filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");
    }

    moduleName += filenameRelative;

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    return moduleName;
  }

  _pushStatement(ref, nodes) {
    if (t.isClass(ref) || t.isFunction(ref)) {
      if (ref.id) {
        nodes.push(t.toStatement(ref));
        ref = ref.id;
      }
    }

    return ref;
  }

  _hoistExport(declar, assign, priority) {
    if (t.isFunctionDeclaration(declar)) {
      assign._blockHoist = priority || 2;
    }

    return assign;
  }

  getExternalReference(node, nodes) {
    var ids = this.ids;
    var id = node.source.value;

    if (ids[id]) {
      return ids[id];
    } else {
      return this.ids[id] = this._getExternalReference(node, nodes);
    }
  }

  checkExportIdentifier(node) {
    if (t.isIdentifier(node, { name: "__esModule" })) {
      throw this.file.errorWithNode(node, messages.get("modulesIllegalExportName", node.name));
    }
  }

  exportAllDeclaration(node, nodes) {
    var ref = this.getExternalReference(node, nodes);
    nodes.push(this.buildExportsWildcard(ref, node));
  }

  isLoose() {
    return this.file.isLoose("es6.modules");
  }

  exportSpecifier(specifier, node, nodes) {
    if (node.source) {
      var ref = this.getExternalReference(node, nodes);

      if (specifier.local.name === "default" && !this.noInteropRequireExport) {
        // importing a default so we need to normalize it
        ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
      } else {
        ref = t.memberExpression(ref, specifier.local);

        if (!this.isLoose()) {
          nodes.push(this.buildExportsFromAssignment(specifier.exported, ref, node));
          return;
        }
      }

      // export { foo } from "test";
      nodes.push(this.buildExportsAssignment(specifier.exported, ref, node));
    } else {
      // export { foo };
      nodes.push(this.buildExportsAssignment(specifier.exported, specifier.local, node));
    }
  }

  buildExportsWildcard(objectIdentifier) {
    return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [
      t.identifier("exports"),
      t.callExpression(this.file.addHelper("interop-require-wildcard"), [objectIdentifier])
    ]));
  }

  buildExportsFromAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-from-assign", {
      INIT: init,
      ID:   t.literal(id.name)
    }, true);
  }

  buildExportsAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-assign", {
      VALUE: init,
      KEY:   id
    }, true);
  }

  exportDeclaration(node, nodes) {
    var declar = node.declaration;

    var id = declar.id;

    if (t.isExportDefaultDeclaration(node)) {
      id = t.identifier("default");
    }

    var assign;

    if (t.isVariableDeclaration(declar)) {
      for (var i = 0; i < declar.declarations.length; i++) {
        var decl = declar.declarations[i];

        decl.init = this.buildExportsAssignment(decl.id, decl.init, node).expression;

        var newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === 0) t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      var ref = declar;

      if (t.isFunctionDeclaration(declar) || t.isClassDeclaration(declar)) {
        ref = declar.id;
        nodes.push(declar);
      }

      assign = this.buildExportsAssignment(id, ref, node);

      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  }
}
