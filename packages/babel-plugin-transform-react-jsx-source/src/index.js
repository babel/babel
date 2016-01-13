
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
 * <sometag __source={{fileName: 'this/file.js', lineNumber: 10}}/>
 */


import path from "path";

const TRACE_ID = "__source";

export default function ({ types: t }) {
  function makeTrace(fileName, lineNumber) {
    const fileNameLiteral = fileName != null ? t.stringLiteral(fileName) : t.nullLiteral();
    const fileLineLiteral = lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    const fileNameProperty = t.objectProperty(t.identifier("fileName"), fileNameLiteral);
    const lineNumberProperty = t.objectProperty(t.identifier("lineNumber"), fileLineLiteral);
    return t.objectExpression([fileNameProperty, lineNumberProperty]);
  }

  let visitor = {
    JSXOpeningElement(node, state) {
      const id = t.jSXIdentifier(TRACE_ID);
      const fileName = state.file.log.filename !== "unknown"
        ? path.relative(__dirname, state.file.log.filename)
        : null;
      const trace = makeTrace(fileName, node.container.openingElement.loc.start.line);

      node.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
    }
  };

  return {
    visitor
  };
};
