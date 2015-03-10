import DefaultFormatter from "./_default";
import includes from "lodash/collection/includes";
import * as util from  "../../util";
import * as t from "../../types";

export default class CommonJSFormatter extends DefaultFormatter {
  init() {
    var file  = this.file;
    var scope = file.scope;

    scope.rename("module");

    if (!this.noInteropRequireImport && this.hasNonDefaultExports) {
      var templateName = "exports-module-declaration";
      if (this.file.isLoose("es6.modules")) templateName += "-loose";
      file.ast.program.body.unshift(util.template(templateName, true));
    }
  };

  importSpecifier(specifier, node, nodes) {
    var variableName = t.getSpecifierName(specifier);

    var ref = this.getExternalReference(node, nodes);

    // import foo from "foo";
    if (t.isSpecifierDefault(specifier)) {
      if (!includes(this.file.dynamicImportedNoDefault, node)) {
        if (this.noInteropRequireImport || includes(this.file.dynamicImported, node)) {
          ref = t.memberExpression(ref, t.identifier("default"));
        } else {
          ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
        }
      }
      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(variableName, ref)]));
    } else {
      if (specifier.type === "ImportBatchSpecifier") {

        if (!this.noInteropRequireImport) {
          ref = t.callExpression(this.file.addHelper("interop-require-wildcard"), [ref]);
        }

        // import * as bar from "foo";
        nodes.push(t.variableDeclaration("var", [
          t.variableDeclarator(variableName, ref)
        ]));
      } else {
        // import { foo } from "foo";
        nodes.push(t.variableDeclaration("var", [
          t.variableDeclarator(
            variableName,
            t.memberExpression(ref, t.getSpecifierId(specifier))
          )
        ]));
      }
    }
  }

  importDeclaration(node, nodes) {
    // import "foo";
    nodes.push(util.template("require", {
      MODULE_NAME: node.source
    }, true));
  }

  exportDeclaration(node, nodes) {
    if (this.doDefaultExportInterop(node)) {
      var declar = node.declaration;
      var assign = util.template("exports-default-assign", {
        VALUE: this._pushStatement(declar, nodes)
      }, true);

      if (t.isFunctionDeclaration(declar)) {
        // we can hoist this assignment to the top of the file
        assign._blockHoist = 3;
      }

      nodes.push(assign);
      return;
    }

    DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
  }

  _getExternalReference(node, nodes) {
    var source = node.source.value;
    var call = t.callExpression(t.identifier("require"), [node.source]);

    if (this.localImportOccurences[source] > 1) {
      var uid = this.scope.generateUidIdentifier(source);
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(uid, call)
      ]));
      return uid;
    } else {
      return call;
    }
  }
}
