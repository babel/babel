import * as messages from "../../messages";
import extend from "lodash/object/extend";
import object from "../../helpers/object";
import * as util from  "../../util";
import t from "../../types";

var remapVisitor = {
  enter(node, parent, scope, formatter) {
    if (t.isUpdateExpression(node) && formatter.isLocalReference(node.argument, scope)) {
      this.skip();

      // expand to long file assignment expression
      var assign = t.assignmentExpression(node.operator[0] + "=", node.argument, t.literal(1));

      // remap this assignment expression
      var remapped = formatter.remapExportAssignment(assign);

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

    if (t.isAssignmentExpression(node) && formatter.isLocalReference(node.left, scope)) {
      this.skip();
      return formatter.remapExportAssignment(node);
    }
  }
};

var importsVisitor = {
  enter(node, parent, scope, formatter) {
    if (t.isImportDeclaration(node)) {
      formatter.hasLocalImports = true;
      extend(formatter.localImports, t.getBindingIdentifiers(node));
      formatter.bumpImportOccurences(node);
    }
  }
};

var exportsVisitor = {
  enter(node, parent, scope, formatter) {
    var declar = node && node.declaration;
    if (t.isExportDeclaration(node)) {
      formatter.hasLocalImports = true;

      if (declar && t.isStatement(declar)) {
        extend(formatter.localExports, t.getBindingIdentifiers(declar));
      }

      if (!node.default) {
        formatter.hasNonDefaultExports = true;
      }

      if (node.source) {
        formatter.bumpImportOccurences(node);
      }
    }
  }
};

export default class DefaultFormatter {
  constructor(file) {
    this.scope = file.scope;
    this.file  = file;
    this.ids   = object();

    this.hasNonDefaultExports = false;

    this.hasLocalExports = false;
    this.hasLocalImports = false;

    this.localImportOccurences = object();
    this.localExports = object();
    this.localImports = object();

    this.getLocalExports();
    this.getLocalImports();

    this.remapAssignments();
  }

  doDefaultExportInterop(node) {
    return node.default && !this.noInteropRequireExport && !this.hasNonDefaultExports;
  }

  bumpImportOccurences(node) {
    var source = node.source.value;
    var occurs = this.localImportOccurences;
    occurs[source] ||= 0;
    occurs[source] += node.specifiers.length;
  }

  getLocalExports() {
    this.file.scope.traverse(this.file.ast, exportsVisitor, this);
  }

  getLocalImports() {
    this.file.scope.traverse(this.file.ast, importsVisitor, this);
  }

  remapAssignments() {
    if (this.hasLocalImports) {
      this.file.scope.traverse(this.file.ast, remapVisitor, this);
    }
  }

  isLocalReference(node) {
    var localImports = this.localImports;
    return t.isIdentifier(node) && localImports[node.name] && localImports[node.name] !== node;
  }

  remapExportAssignment(node) {
    return t.assignmentExpression(
      "=",
      node.left,
      t.assignmentExpression(
        node.operator,
        t.memberExpression(t.identifier("exports"), node.left),
        node.right
      )
    );
  }

  isLocalReference(node, scope) {
    var localExports = this.localExports;
    var name = node.name;
    return t.isIdentifier(node) && localExports[name] && localExports[name] === scope.getBindingIdentifier(name);
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

  exportSpecifier(specifier, node, nodes) {
    if (node.source) {
      var ref = this.getExternalReference(node, nodes);

      if (t.isExportBatchSpecifier(specifier)) {
        // export * from "foo";
        nodes.push(this.buildExportsWildcard(ref, node));
      } else {
        if (t.isSpecifierDefault(specifier) && !this.noInteropRequireExport) {
          // importing a default so we need to normalize it
          ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
        } else {
          ref = t.memberExpression(ref, t.getSpecifierId(specifier));
        }

        // export { foo } from "test";
        nodes.push(this.buildExportsAssignment(
          t.getSpecifierName(specifier),
          ref,
          node
        ));
      }
    } else {
      // export { foo };
      nodes.push(this.buildExportsAssignment(t.getSpecifierName(specifier), specifier.id, node));
    }
  }

  buildExportsWildcard(objectIdentifier) {
    return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [
      t.identifier("exports"),
      t.callExpression(this.file.addHelper("interop-require-wildcard"), [objectIdentifier])
    ]));
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

    if (node.default) {
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
