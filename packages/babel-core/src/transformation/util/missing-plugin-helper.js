// @flow

const pluginNameMap = {
  asyncGenerators: {
    syntax: "@babel/plugin-syntax-async-generators",
    transform: "@babel/plugin-proposal-async-generator-functions",
  },
  bigInt: {
    issueLink: "https://github.com/babel/proposals/issues/2",
  },
  classPrivateMethods: {
    issueLink: "https://github.com/babel/proposals/issues/22",
  },
  classPrivateProperties: {
    issueLink: "https://github.com/babel/proposals/issues/22",
  },
  classProperties: {
    syntax: "@babel/plugin-syntax-class-properties",
    transform: "@babel/plugin-proposal-class-properties",
  },
  decorators: {
    syntax: "@babel/plugin-syntax-decorators",
    transform: "@babel/plugin-proposal-decorators",
  },
  doExpressions: {
    syntax: "@babel/plugin-syntax-do-expressions",
    transform: "@babel/plugin-proposal-do-expressions",
  },
  dynamicImport: {
    syntax: "@babel/plugin-syntax-dynamic-import",
  },
  // Not required to be handled.
  // (See https://github.com/babel/babel/issues/6205#issuecomment-346997662).
  // Here just to complete the plugin map
  estree: {},
  exportDefaultFrom: {
    syntax: "@babel/plugin-syntax-export-default-from",
    transform: "@babel/plugin-proposal-export-default-from",
  },
  exportNamespaceFrom: {
    syntax: "@babel/plugin-syntax-export-namespace-from",
    transform: "@babel/plugin-proposal-export-namespace-from",
  },
  flow: {
    syntax: "@babel/plugin-syntax-flow",
    transform: "@babel/plugin-transform-flow-strip-type",
  },
  functionBind: {
    syntax: "@babel/plugin-syntax-function-bind",
    transform: "@babel/plugin-proposal-function-bind",
  },
  functionSent: {
    syntax: "@babel/plugin-syntax-function-sent",
    transform: "@babel/plugin-proposal-function-sent",
  },
  importMeta: {
    issueLink: "https://github.com/babel/proposals/issues/10",
  },
  jsx: {
    syntax: "@babel/plugin-syntax-jsx",
    transform: "@babel/plugin-transform-react-jsx",
  },
  nullishCoalescingOperator: {
    syntax: "@babel/plugin-syntax-nullish-coalescing-operator",
    transform: "@babel/plugin-proposal-nullish-coalescing-operator",
  },
  numericSeparator: {
    syntax: "@babel/plugin-syntax-numeric-separator",
    transform: "@babel/plugin-proposal-numeric-separator",
  },
  objectRestSpread: {
    syntax: "@babel/plugin-syntax-object-rest-spread",
    transform: "@babel/plugin-proposal-object-rest-spread",
  },
  optionalCatchBinding: {
    syntax: "@babel/plugin-syntax-optional-catch-binding",
    transform: "@babel/plugin-proposal-optional-catch-binding",
  },
  optionalChaining: {
    syntax: "@babel/plugin-syntax-optional-chaining",
    transform: "@babel/plugin-proposal-optional-chaining",
  },
  pipelineOperator: {
    syntax: "@babel/plugin-syntax-pipeline-operator",
    transform: "@babel/plugin-proposal-pipeline-operator",
  },
  throwExpressions: {
    syntax: "@babel/plugin-syntax-throw-expressions",
    transform: "@babel/plugin-proposal-throw-expressions",
  },
  typescript: {
    syntax: "@babel/plugin-syntax-typescript",
    transform: "@babel/plugin-transform-typescript",
  },
};

export default function generateHelpMessage(
  missingPlugins: string[] = [],
): string {
  let helpMessage = "";
  const pluginName = missingPlugins.length && missingPlugins[0];
  if (pluginName) {
    const pluginInfo = pluginNameMap[pluginName];
    if (pluginInfo) {
      const {
        syntax: syntaxPlugin,
        transform: transformPlugin,
        issueLink,
      } = pluginInfo;
      if (syntaxPlugin) {
        if (transformPlugin) {
          helpMessage =
            `Use the ${syntaxPlugin} plugin to enable parsing. ` +
            `Use the ${transformPlugin} plugin to enable transformation.` +
            `\nNote: The transform plugins already include the syntax plugins, so you don't need both.`;
        } else {
          helpMessage =
            `Use the ${syntaxPlugin} plugin to enable parsing. ` +
            `Babel doesn't support transforming this syntax.`;
        }
      } else if (issueLink) {
        helpMessage =
          `This syntax is not supported yet. ` +
          `Follow it's development at ${issueLink}.`;
      }
    }
  }
  return helpMessage;
}
