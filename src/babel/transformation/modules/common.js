import DefaultFormatter from "./_default";
import * as util from  "../../util";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export default class CommonJSFormatter extends DefaultFormatter {

  /**
   * [Please add a description.]
   */

  setup() {
    this._setup(this.hasLocalExports);
  }

  /**
   * [Please add a description.]
   */

  _setup(conditional) {
    var file  = this.file;
    var scope = file.scope;

    scope.rename("module");
    scope.rename("exports");

    if (!this.noInteropRequireImport && conditional) {
      var templateName = "exports-module-declaration";
      if (this.file.isLoose("es6.modules")) templateName += "-loose";
      var declar = util.template(templateName, true);
      declar._blockHoist = 3;
      file.path.unshiftContainer("body", [declar]);
    }
  }

  /**
   * [Please add a description.]
   */

  transform(program) {
    DefaultFormatter.prototype.transform.apply(this, arguments);

    if (this.hasDefaultOnlyExport) {
      program.body.push(
        t.expressionStatement(t.assignmentExpression(
          "=",
          t.memberExpression(t.identifier("module"), t.identifier("exports")),
          t.memberExpression(t.identifier("exports"), t.identifier("default"))
        ))
      );
    }
  }

  /**
   * [Please add a description.]
   */

  importSpecifier(specifier, node, nodes, scope) {
    var variableName = specifier.local;

    var ref = this.getExternalReference(node, nodes);

    // import foo from "foo";
    if (t.isSpecifierDefault(specifier)) {
      if (this.isModuleType(node, "absolute")) {
        // absolute module reference
      } else if (this.isModuleType(node, "absoluteDefault")) {
        this.remaps.add(scope, variableName.name, ref);
      } else if (this.noInteropRequireImport) {
        this.remaps.add(scope, variableName.name, t.memberExpression(ref, t.identifier("default")));
      } else {
        var uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");

        nodes.push(t.variableDeclaration("var", [
          t.variableDeclarator(uid, t.callExpression(this.file.addHelper("interop-require-default"), [ref]))
        ]));

        this.remaps.add(scope, variableName.name, t.memberExpression(uid, t.identifier("default")));
      }
    } else {
      if (t.isImportNamespaceSpecifier(specifier)) {
        if (!this.noInteropRequireImport) {
          ref = t.callExpression(this.file.addHelper("interop-require-wildcard"), [ref]);
        }

        // import * as bar from "foo";
        nodes.push(t.variableDeclaration("var", [
          t.variableDeclarator(variableName, ref)
        ]));
      } else {
        // import { foo } from "foo";
        this.remaps.add(scope, variableName.name, t.memberExpression(ref, specifier.imported));
      }
    }
  }

  /**
   * [Please add a description.]
   */

  importDeclaration(node, nodes) {
    // import "foo";
    nodes.push(util.template("require", {
      MODULE_NAME: node.source
    }, true));
  }

  /**
   * [Please add a description.]
   */

  exportSpecifier(specifier) {
    if (this.doDefaultExportInterop(specifier)) {
      this.hasDefaultOnlyExport = true;
    }

    DefaultFormatter.prototype.exportSpecifier.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  exportDeclaration(node) {
    if (this.doDefaultExportInterop(node)) {
      this.hasDefaultOnlyExport = true;
    }

    DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  _getExternalReference(node, nodes) {
    var call = t.callExpression(t.identifier("require"), [node.source]);
    var uid;

    if (this.isModuleType(node, "absolute")) {
      // absolute module reference
    } else if (this.isModuleType(node, "absoluteDefault")) {
      call = t.memberExpression(call, t.identifier("default"));
    } else {
      uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");
    }

    uid = uid || node.specifiers[0].local;

    var declar = t.variableDeclaration("var", [
      t.variableDeclarator(uid, call)
    ]);
    nodes.push(declar);
    return uid;
  }
}
