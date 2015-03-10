import * as strict from "../../helpers/strict";
import * as t from "../../../types";

export var secondPass = true;

export function BlockStatement(node, parent, scope, file) {
  if (!node._declarations) return;

  strict.wrap(node, function () {
    var kinds = {};
    var kind;

    for (var i in node._declarations) {
      var declar = node._declarations[i];

      kind = declar.kind || "var";
      var declarNode = t.variableDeclarator(declar.id, declar.init);

      if (declar.init) {
        node.body.unshift(file.attachAuxiliaryComment(t.variableDeclaration(kind, [declarNode])));
      } else {
        kinds[kind] ||= [];
        kinds[kind].push(declarNode);
      }
    }

    for (kind in kinds) {
      node.body.unshift(file.attachAuxiliaryComment(t.variableDeclaration(kind, kinds[kind])));
    }

    node._declarations = null;
  });
}

export { BlockStatement as Program };
