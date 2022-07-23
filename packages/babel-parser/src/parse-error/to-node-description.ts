const NodeDescriptions = {
  ArrayPattern: "array destructuring pattern",
  AssignmentExpression: "assignment expression",
  AssignmentPattern: "assignment expression",
  ArrowFunctionExpression: "arrow function expression",
  ConditionalExpression: "conditional expression",
  CatchClause: "catch clause",
  ForOfStatement: "for-of statement",
  ForInStatement: "for-in statement",
  ForStatement: "for-loop",
  FormalParameters: "function parameter list",
  Identifier: "identifier",
  ImportSpecifier: "import specifier",
  ImportDefaultSpecifier: "import default specifier",
  ImportNamespaceSpecifier: "import namespace specifier",
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

type NodeTypesWithDescriptions = keyof Omit<
  typeof NodeDescriptions,
  "UpdateExpression"
>;

type NodeWithDescription =
  | {
      type: "UpdateExpression";
      prefix: boolean;
    }
  | {
      type: NodeTypesWithDescriptions;
    };

// @ts-expect-error prefix is specified only when type is UpdateExpression
// eslint-disable-next-line no-confusing-arrow
const toNodeDescription = ({ type, prefix }: NodeWithDescription) =>
  type === "UpdateExpression"
    ? NodeDescriptions.UpdateExpression[String(prefix) as "true" | "false"]
    : NodeDescriptions[type];

export default toNodeDescription;
