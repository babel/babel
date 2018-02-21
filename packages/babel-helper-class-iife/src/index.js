import { types as t } from "@babel/core";
import annotateAsPure from "@babel/helper-annotate-as-pure";

const classIIFEs = new WeakMap();

export default function getClassIIFE(path, assumePure) {
  const { node } = path;

  if (classIIFEs.has(node)) {
    return classIIFEs.get(node);
  }

  const iife = t.callExpression(
    t.arrowFunctionExpression([], t.blockStatement([])),
    [],
  );

  classIIFEs.set(node, iife);

  if (assumePure || path.isPure()) {
    annotateAsPure(iife);
  }

  return iife;
}
