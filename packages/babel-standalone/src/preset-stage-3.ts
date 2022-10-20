import * as babelPlugins from "./generated/plugins";

export default (_: any, { loose = false } = {}) => {
  // todo(flow->ts) improve types
  const plugins: any[] = [
    babelPlugins.syntaxImportAssertions,
    babelPlugins.proposalUnicodeSetsRegex,
    babelPlugins.proposalDuplicateNamedCapturingGroupsRegex,
  ];

  if (!process.env.BABEL_8_BREAKING) {
    // These are Stage 4
    plugins.push(
      babelPlugins.proposalExportNamespaceFrom,
      babelPlugins.proposalLogicalAssignmentOperators,
      [babelPlugins.proposalOptionalChaining, { loose }],
      [babelPlugins.proposalNullishCoalescingOperator, { loose }],
      [babelPlugins.proposalClassProperties, { loose }],
      babelPlugins.proposalJsonStrings,
      babelPlugins.proposalNumericSeparator,
      [babelPlugins.proposalPrivateMethods, { loose }],
      babelPlugins.proposalPrivatePropertyInObject,
      babelPlugins.proposalClassStaticBlock,
    );
  }

  return { plugins };
};
