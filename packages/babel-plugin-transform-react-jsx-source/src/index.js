
 /**
 * This adds {fileName, lineNumber} annotations to React component definitions
 * and to jsx tag literals.
 *
 *
 * == JSX Literals ==
 *
 * <sometag />
 *
 * becomes:
 *
 * var __jsxFileName = 'this/file.js';
 * <sometag __source={{fileName: __jsxFileName, lineNumber: 10}}/>
 */


const TRACE_ID = "__source";
const FILE_NAME_VAR = "__jsxFileName";

export default function ({ types: t }) {
  function makeTrace(lineNumber) {
    const fileLineLiteral = lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    const fileNameProperty = t.objectProperty(t.identifier("fileName"), t.identifier(FILE_NAME_VAR));
    const lineNumberProperty = t.objectProperty(t.identifier("lineNumber"), fileLineLiteral);
    return t.objectExpression([fileNameProperty, lineNumberProperty]);
  }

  function makeFileNameConst(fileName) {
    const declaration = t.variableDeclarator(t.identifier(FILE_NAME_VAR), t.stringLiteral(fileName));
    return t.variableDeclaration("var", [declaration]);
  }

  let visitor = {
    Program(node, state) {
      const fileName = state.file.log.filename !== "unknown"
        ? state.file.log.filename
        : null;

      node.container.program.body.unshift(makeFileNameConst(fileName));
    },

    JSXOpeningElement(node) {
      const id = t.jSXIdentifier(TRACE_ID);
      const trace = makeTrace(node.container.openingElement.loc.start.line);

      node.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    }
  };

  return {
    visitor
  };
}
