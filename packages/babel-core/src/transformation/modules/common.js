import DefaultFormatter from "./_default";
import * as util from  "../../util";
import * as t from "babel-types";

export default class CommonJSFormatter extends DefaultFormatter {
  setup() {
    this._setup(this.hasLocalExports);
  }

  _setup(conditional) {
    let file  = this.file;
    let scope = file.scope;

    scope.rename("module");
    scope.rename("exports");

    if (!this.noInteropRequireImport && conditional) {
      let templateName = "exports-module-declaration";
      if (this.file.isLoose("es6.modules")) templateName += "-loose";
      let declar = util.template(templateName, true);
      declar._blockHoist = 3;
      file.path.unshiftContainer("body", [declar]);
    }
  }

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

  importSpecifier(specifier, node, nodes, scope) {
    let variableName = specifier.local;

    let ref = this.getExternalReference(node, nodes);

    // import foo from "foo";
    if (t.isSpecifierDefault(specifier)) {
      if (this.isModuleType(node, "absolute")) {
        // absolute module reference
      } else if (this.isModuleType(node, "absoluteDefault")) {
        this.remaps.add(scope, variableName.name, ref);
      } else if (this.noInteropRequireImport) {
        this.remaps.add(scope, variableName.name, t.memberExpression(ref, t.identifier("default")));
      } else {
        let uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");

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
        this.remaps.add(scope, variableName.name,
          t.memberExpression(ref, t.identifier(specifier.imported.name)));
      }
    }
  }

  importDeclaration(node, nodes) {
    // import "foo";
    nodes.push(util.template("require", {
      MODULE_NAME: node.source
    }, true));
  }

  exportSpecifier(specifier) {
    if (this.doDefaultExportInterop(specifier)) {
      this.hasDefaultOnlyExport = true;
    }

    DefaultFormatter.prototype.exportSpecifier.apply(this, arguments);
  }

  exportDeclaration(node) {
    if (this.doDefaultExportInterop(node)) {
      this.hasDefaultOnlyExport = true;
    }

    DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
  }

  _getExternalReference(node, nodes) {
    let call = t.callExpression(t.identifier("require"), [node.source]);
    let uid;

    if (this.isModuleType(node, "absolute")) {
      // absolute module reference
    } else if (this.isModuleType(node, "absoluteDefault")) {
      call = t.memberExpression(call, t.identifier("default"));
    } else {
      uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");
    }

    uid = uid || node.specifiers[0].local;

    let declar = t.variableDeclaration("var", [
      t.variableDeclarator(uid, call)
    ]);
    nodes.push(declar);
    return uid;
  }
}
