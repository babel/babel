import * as babelPlugins from "./generated/plugins";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    decoratorsLegacy = false,
    decoratorsVersion = "2018-09",
    decoratorsBeforeExport,
  } = opts;

  const plugins = [
    babelPlugins.syntaxImportAssertions,
    babelPlugins.proposalUnicodeSetsRegex,
    babelPlugins.proposalDuplicateNamedCapturingGroupsRegex,
    [
      babelPlugins.proposalDecorators,
      {
        version: decoratorsLegacy ? "legacy" : decoratorsVersion,
        decoratorsBeforeExport,
      },
    ],
    babelPlugins.proposalRegexpModifiers,
    // These are Stage 4
    ...(process.env.BABEL_8_BREAKING
      ? []
      : [
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
        ]),
  ];

  return { plugins };
};
