import {
  isJSXText,
  isJSXExpressionContainer,
  isJSXEmptyExpression,
} from "../../validators/generated";
import cleanJSXElementLiteralChild from "../../utils/react/cleanJSXElementLiteralChild";
import type * as types from "../../types";

type ReturnedChild =
  | types.JSXExpressionContainer
  | types.JSXSpreadChild
  | types.JSXElement
  | types.JSXFragment
  | types.Expression;

export default function buildChildren(node: {
  children: ReadonlyArray<
    | types.JSXText
    | types.JSXExpressionContainer
    | types.JSXSpreadChild
    | types.JSXElement
    | types.JSXFragment
    | types.JSXEmptyExpression
  >;
}): ReturnedChild[] {
  const elements = [];

  for (let i = 0; i < node.children.length; i++) {
    let child: any = node.children[i];

    if (isJSXText(child)) {
      cleanJSXElementLiteralChild(child, elements);
      continue;
    }

    if (isJSXExpressionContainer(child)) child = child.expression;
    if (isJSXEmptyExpression(child)) continue;

    elements.push(child);
  }

  return elements;
}
