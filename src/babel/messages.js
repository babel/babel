import * as util from  "util";

export const MESSAGES = {
  tailCallReassignmentDeopt: "Function reference has been reassigned so it's probably be dereferenced so we can't optimise this with confidence",
  JSXNamespacedTags: "Namespace tags are not supported. ReactJSX is not XML.",
  classesIllegalBareSuper: "Illegal use of bare super",
  classesIllegalSuperCall: "Direct super call is illegal in non-constructor, use super.$1() instead",
  classesIllegalConstructorKind: "Illegal kind for constructor method",
  scopeDuplicateDeclaration: "Duplicate declaration $1",
  undeclaredVariable: "Reference to undeclared variable $1",
  undeclaredVariableSuggestion: "Reference to undeclared variable $1 - did you mean $2?",
  settersInvalidParamLength: "Setters must have exactly one parameter",
  settersNoRest: "Setters aren't allowed to have a rest",
  noAssignmentsInForHead: "No assignments allowed in for-in/of head",
  expectedMemberExpressionOrIdentifier: "Expected type MemeberExpression or Identifier",
  invalidParentForThisNode: "We don't know how to handle this node within the current parent - please open an issue",
  readOnly: "$1 is read-only",
  modulesIllegalExportName: "Illegal export $1",
  unknownForHead: "Unknown node type $1 in ForStatement",
  didYouMean: "Did you mean $1?",
  evalInStrictMode: "eval is not allowed in strict mode",
  codeGeneratorDeopt: "Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",
  missingTemplatesDirectory: "no templates directory - this is most likely the result of a broken `npm publish`. Please report to https://github.com/babel/babel/issues",
  unsupportedOutputType: "Unsupported output type $1",
  illegalMethodName: "Illegal method name $1"
};

export function get(key: String, ...args) {
  var msg = MESSAGES[key];
  if (!msg) throw new ReferenceError(`Unknown message ${JSON.stringify(key)}`);

  args = parseArgs(args);

  return msg.replace(/\$(\d+)/g, function (str, i) {
    return args[--i];
  });
}

export function parseArgs(args: Array<any>) {
  return args.map(function (val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        return JSON.stringify(val) || val + "";
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}
