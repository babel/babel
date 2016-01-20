
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
const FILE_NAME_VAR = "_jsxFileName";

export default function ({ types: t }) {
  function makeTrace(fileNameIdentifier, lineNumber) {
    const fileLineLiteral = lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    const fileNameProperty = t.objectProperty(t.identifier("fileName"), fileNameIdentifier);
    const lineNumberProperty = t.objectProperty(t.identifier("lineNumber"), fileLineLiteral);
    return t.objectExpression([fileNameProperty, lineNumberProperty]);
  }

  let visitor = {
    JSXOpeningElement(node, state) {
      if (!state.fileNameIdentifier) {
        const fileName = state.file.log.filename !== "unknown"
          ? state.file.log.filename
          : null;

        const fileNameIdentifier = node.scope.generateUidIdentifier(FILE_NAME_VAR);
        node.hub.file.scope.push({id: fileNameIdentifier, init: t.stringLiteral(fileName)});
        state.fileNameIdentifier = fileNameIdentifier;
      }

      const id = t.jSXIdentifier(TRACE_ID);
      const location = node.container.openingElement.loc; // undefined for generated elements
      if (location) {
        const trace = makeTrace(state.fileNameIdentifier, location.start.line);
        node.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
      }
    }
  };

  return {
    visitor
  };
}
