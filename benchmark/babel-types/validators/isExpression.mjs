import Benchmark from "benchmark";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();

function isExpressionIf(node) {
  if (!node) return false;
  const nodeType = node.type;
  if (
    "ArrayExpression" === nodeType ||
    "AssignmentExpression" === nodeType ||
    "BinaryExpression" === nodeType ||
    "CallExpression" === nodeType ||
    "ConditionalExpression" === nodeType ||
    "FunctionExpression" === nodeType ||
    "Identifier" === nodeType ||
    "StringLiteral" === nodeType ||
    "NumericLiteral" === nodeType ||
    "NullLiteral" === nodeType ||
    "BooleanLiteral" === nodeType ||
    "RegExpLiteral" === nodeType ||
    "LogicalExpression" === nodeType ||
    "MemberExpression" === nodeType ||
    "NewExpression" === nodeType ||
    "ObjectExpression" === nodeType ||
    "SequenceExpression" === nodeType ||
    "ParenthesizedExpression" === nodeType ||
    "ThisExpression" === nodeType ||
    "UnaryExpression" === nodeType ||
    "UpdateExpression" === nodeType ||
    "ArrowFunctionExpression" === nodeType ||
    "ClassExpression" === nodeType ||
    "MetaProperty" === nodeType ||
    "Super" === nodeType ||
    "TaggedTemplateExpression" === nodeType ||
    "TemplateLiteral" === nodeType ||
    "YieldExpression" === nodeType ||
    "AwaitExpression" === nodeType ||
    "Import" === nodeType ||
    "BigIntLiteral" === nodeType ||
    "OptionalMemberExpression" === nodeType ||
    "OptionalCallExpression" === nodeType ||
    "TypeCastExpression" === nodeType ||
    "JSXElement" === nodeType ||
    "JSXFragment" === nodeType ||
    "BindExpression" === nodeType ||
    "DoExpression" === nodeType ||
    "RecordExpression" === nodeType ||
    "TupleExpression" === nodeType ||
    "DecimalLiteral" === nodeType ||
    "ModuleExpression" === nodeType ||
    "TopicReference" === nodeType ||
    "PipelineTopicExpression" === nodeType ||
    "PipelineBareFunction" === nodeType ||
    "PipelinePrimaryTopicReference" === nodeType ||
    "TSInstantiationExpression" === nodeType ||
    "TSAsExpression" === nodeType ||
    "TSSatisfiesExpression" === nodeType ||
    "TSTypeAssertion" === nodeType ||
    "TSNonNullExpression" === nodeType ||
    (nodeType === "Placeholder" &&
      ("Expression" === node.expectedNode ||
        "Identifier" === node.expectedNode ||
        "StringLiteral" === node.expectedNode))
  ) {
    return true;
  }
}

function isExpressionSwitch(node) {
  if (!node) return false;
  switch (node.type) {
    case "ArrayExpression":
    case "AssignmentExpression":
    case "BinaryExpression":
    case "CallExpression":
    case "ConditionalExpression":
    case "FunctionExpression":
    case "Identifier":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "LogicalExpression":
    case "MemberExpression":
    case "NewExpression":
    case "ObjectExpression":
    case "SequenceExpression":
    case "ParenthesizedExpression":
    case "ThisExpression":
    case "UnaryExpression":
    case "UpdateExpression":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "MetaProperty":
    case "Super":
    case "TaggedTemplateExpression":
    case "TemplateLiteral":
    case "YieldExpression":
    case "AwaitExpression":
    case "Import":
    case "BigIntLiteral":
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "TypeCastExpression":
    case "JSXElement":
    case "JSXFragment":
    case "BindExpression":
    case "DoExpression":
    case "RecordExpression":
    case "TupleExpression":
    case "DecimalLiteral":
    case "ModuleExpression":
    case "TopicReference":
    case "PipelineTopicExpression":
    case "PipelineBareFunction":
    case "PipelinePrimaryTopicReference":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      return true;
    case "Placeholder":
      if (
        "Expression" === node.expectedNode ||
        "Identifier" === node.expectedNode ||
        "StringLiteral" === node.expectedNode
      ) {
        return true;
      }
  }
  return false;
}

function isExpressionIncludes(node) {
  if (!node) return false;

  const nodeType = node.type;
  return (
    [
      "ArrayExpression",
      "AssignmentExpression",
      "BinaryExpression",
      "CallExpression",
      "ConditionalExpression",
      "FunctionExpression",
      "Identifier",
      "StringLiteral",
      "NumericLiteral",
      "NullLiteral",
      "BooleanLiteral",
      "RegExpLiteral",
      "LogicalExpression",
      "MemberExpression",
      "NewExpression",
      "ObjectExpression",
      "SequenceExpression",
      "ParenthesizedExpression",
      "ThisExpression",
      "UnaryExpression",
      "UpdateExpression",
      "ArrowFunctionExpression",
      "ClassExpression",
      "MetaProperty",
      "Super",
      "TaggedTemplateExpression",
      "TemplateLiteral",
      "YieldExpression",
      "AwaitExpression",
      "Import",
      "BigIntLiteral",
      "OptionalMemberExpression",
      "OptionalCallExpression",
      "TypeCastExpression",
      "JSXElement",
      "JSXFragment",
      "BindExpression",
      "DoExpression",
      "RecordExpression",
      "TupleExpression",
      "DecimalLiteral",
      "ModuleExpression",
      "TopicReference",
      "PipelineTopicExpression",
      "PipelineBareFunction",
      "PipelinePrimaryTopicReference",
      "TSInstantiationExpression",
      "TSAsExpression",
      "TSSatisfiesExpression",
      "TSTypeAssertion",
      "TSNonNullExpression",
    ].includes(nodeType) ||
    (nodeType === "Placeholder" &&
      ("Expression" === node.expectedNode ||
        "Identifier" === node.expectedNode ||
        "StringLiteral" === node.expectedNode))
  );
}

function benchCases(name, func) {
  suite.add(`isExpression ${name}`, () => {
    func({ type: "ArrayExpression" }); // first
    func({ type: "TSNonNullExpression" }); // last
    func({ type: "XXXXXXXXXXXXX" }); // not found
  });
}

benchCases("if", isExpressionIf);
benchCases("switch", isExpressionSwitch);
benchCases("includes", isExpressionIncludes);

suite.on("cycle", report).run();
