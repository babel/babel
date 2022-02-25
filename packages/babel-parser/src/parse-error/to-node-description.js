const NodeDescriptions = {
  ArrayPattern: "array destructuring pattern",
  AssignmentExpression: "assignment expression",
  AssignmentPattern: "assignment expression",
  ArrowFunctionExpression: "arrow function expression",
  ConditionalExpression: "conditional expression",
  ForOfStatement: "for-of statement",
  ForInStatement: "for-in statement",
  ForStatement: "for-loop",
  FormalParameters: "function parameter list",
  Identifier: "identifier",
  ObjectPattern: "object destructuring pattern",
  ParenthesizedExpression: "parenthesized expression",
  RestElement: "rest element",
  UpdateExpression: {
    true: "prefix operation",
    false: "postfix operation",
  },
  VariableDeclarator: "variable declaration",
  YieldExpression: "yield expression",
};

type NodeTypesWithDescriptions = $Keys<typeof NodeDescriptions>;
type NodeWithDescription =
  | { type: "UpdateExpression", prefix: boolean }
  | { type: NodeTypesWithDescriptions };

// eslint-disable-next-line no-confusing-arrow
const toNodeDescription = ({ type, prefix = false }: NodeWithDescription) =>
  type === "UpdateExpression"
    ? NodeDescriptions.UpdateExpression[String(prefix)]
    : NodeDescriptions[type];

export default toNodeDescription;
