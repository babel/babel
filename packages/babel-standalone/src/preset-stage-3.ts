import * as babelPlugins from "./generated/plugins";

export default (_: any, { loose = false } = {}) => {
  const plugins = [
    babelPlugins.syntaxImportAssertions,
    babelPlugins.proposalClassStaticBlock,
  ];

  if (!process.env.BABEL_8_BREAKING) {
    // These are Stage 4
    plugins.push(
      babelPlugins.syntaxImportMeta,
      babelPlugins.syntaxTopLevelAwait,
      babelPlugins.proposalExportNamespaceFrom,
      babelPlugins.proposalLogicalAssignmentOperators,
      [babelPlugins.proposalOptionalChaining, { loose }],
      [babelPlugins.proposalNullishCoalescingOperator, { loose }],
      [babelPlugins.proposalClassProperties, { loose }],
      babelPlugins.proposalJsonStrings,
      babelPlugins.proposalNumericSeparator,
      [babelPlugins.proposalPrivateMethods, { loose }],
      babelPlugins.proposalPrivatePropertyInObject,
    );
  }

  return { plugins };
};
