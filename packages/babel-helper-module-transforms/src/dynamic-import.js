import * as t from "@babel/types";
import template from "@babel/template";
import { wrapInterop } from "./index";

export function rewriteDynamicImport(
  path: NodePath,
  wrap: (source: Node, resolve: (Node) => Node) => Node,
  { noInterop },
) {
  const resolveId = path.scope.generateUidIdentifier("resolve");

  const _resolve = node => t.callExpression(t.cloneNode(resolveId), [node]);
  const resolve = noInterop
    ? _resolve
    : node => _resolve(wrapInterop(path, node, "namespace"));

  const wrapped = wrap(path.node.arguments[0], resolve);

  path.replaceWith(
    template.expression.ast`new Promise(${resolveId} => ${wrapped})`,
  );
}
