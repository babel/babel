// @flow

const pluginNameMap = {
  asyncGenerators: {
    syntax: {
      name: "@babel/plugin-syntax-async-generators",
      url: "https://git.io/vb4SY",
    },
    transform: {
      name: "@babel/plugin-proposal-async-generator-functions",
      url: "https://git.io/vb4yp",
    },
  },
  classProperties: {
    syntax: {
      name: "@babel/plugin-syntax-class-properties",
      url: "https://git.io/vb4yQ",
    },
    transform: {
      name: "@babel/plugin-proposal-class-properties",
      url: "https://git.io/vb4SL",
    },
  },
  decorators: {
    syntax: {
      name: "@babel/plugin-syntax-decorators",
      url: "https://git.io/vb4y9",
    },
    transform: {
      name: "@babel/plugin-proposal-decorators",
      url: "https://git.io/vb4ST",
    },
  },
  doExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-do-expressions",
      url: "https://git.io/vb4yh",
    },
    transform: {
      name: "@babel/plugin-proposal-do-expressions",
      url: "https://git.io/vb4S3",
    },
  },
  dynamicImport: {
    syntax: {
      name: "@babel/plugin-syntax-dynamic-import",
      url: "https://git.io/vb4Sv",
    },
  },
  exportDefaultFrom: {
    syntax: {
      name: "@babel/plugin-syntax-export-default-from",
      url: "https://git.io/vb4SO",
    },
    transform: {
      name: "@babel/plugin-proposal-export-default-from",
      url: "https://git.io/vb4yH",
    },
  },
  exportNamespaceFrom: {
    syntax: {
      name: "@babel/plugin-syntax-export-namespace-from",
      url: "https://git.io/vb4Sf",
    },
    transform: {
      name: "@babel/plugin-proposal-export-namespace-from",
      url: "https://git.io/vb4SG",
    },
  },
  flow: {
    syntax: {
      name: "@babel/plugin-syntax-flow",
      url: "https://git.io/vb4yb",
    },
    transform: {
      name: "@babel/plugin-transform-flow-strip-types",
      url: "https://git.io/vb49g",
    },
  },
  functionBind: {
    syntax: {
      name: "@babel/plugin-syntax-function-bind",
      url: "https://git.io/vb4y7",
    },
    transform: {
      name: "@babel/plugin-proposal-function-bind",
      url: "https://git.io/vb4St",
    },
  },
  functionSent: {
    syntax: {
      name: "@babel/plugin-syntax-function-sent",
      url: "https://git.io/vb4yN",
    },
    transform: {
      name: "@babel/plugin-proposal-function-sent",
      url: "https://git.io/vb4SZ",
    },
  },
  jsx: {
    syntax: {
      name: "@babel/plugin-syntax-jsx",
      url: "https://git.io/vb4yA",
    },
    transform: {
      name: "@babel/plugin-transform-react-jsx",
      url: "https://git.io/vb4yd",
    },
  },
  nullishCoalescingOperator: {
    syntax: {
      name: "@babel/plugin-syntax-nullish-coalescing-operator",
      url: "https://git.io/vb4yx",
    },
    transform: {
      name: "@babel/plugin-proposal-nullish-coalescing-operator",
      url: "https://git.io/vb4Se",
    },
  },
  numericSeparator: {
    syntax: {
      name: "@babel/plugin-syntax-numeric-separator",
      url: "https://git.io/vb4Sq",
    },
    transform: {
      name: "@babel/plugin-proposal-numeric-separator",
      url: "https://git.io/vb4yS",
    },
  },
  objectRestSpread: {
    syntax: {
      name: "@babel/plugin-syntax-object-rest-spread",
      url: "https://git.io/vb4y5",
    },
    transform: {
      name: "@babel/plugin-proposal-object-rest-spread",
      url: "https://git.io/vb4Ss",
    },
  },
  optionalCatchBinding: {
    syntax: {
      name: "@babel/plugin-syntax-optional-catch-binding",
      url: "https://git.io/vb4Sn",
    },
    transform: {
      name: "@babel/plugin-proposal-optional-catch-binding",
      url: "https://git.io/vb4SI",
    },
  },
  optionalChaining: {
    syntax: {
      name: "@babel/plugin-syntax-optional-chaining",
      url: "https://git.io/vb4Sc",
    },
    transform: {
      name: "@babel/plugin-proposal-optional-chaining",
      url: "https://git.io/vb4Sk",
    },
  },
  pipelineOperator: {
    syntax: {
      name: "@babel/plugin-syntax-pipeline-operator",
      url: "https://git.io/vb4yj",
    },
    transform: {
      name: "@babel/plugin-proposal-pipeline-operator",
      url: "https://git.io/vb4SU",
    },
  },
  throwExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-throw-expressions",
      url: "https://git.io/vb4SJ",
    },
    transform: {
      name: "@babel/plugin-proposal-throw-expressions",
      url: "https://git.io/vb4yF",
    },
  },
  typescript: {
    syntax: {
      name: "@babel/plugin-syntax-typescript",
      url: "https://git.io/vb4SC",
    },
    transform: {
      name: "@babel/plugin-transform-typescript",
      url: "https://git.io/vb4Sm",
    },
  },
};

const getNameURLCombination = ({ name, url }) => `${name} (${url})`;

export default function generateMissingPluginMessage(
  missingPlugins: string[] = [],
): string {
  let helpMessage = "";
  const pluginName = missingPlugins.length && missingPlugins[0];
  if (pluginName) {
    const pluginInfo = pluginNameMap[pluginName];
    if (pluginInfo) {
      const { syntax: syntaxPlugin, transform: transformPlugin } = pluginInfo;
      if (syntaxPlugin) {
        const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
        if (transformPlugin) {
          const transformPluginInfo = getNameURLCombination(syntaxPlugin);
          helpMessage =
            `Support for this experimental syntax isn't currently enabled. ` +
            `Add either ${transformPluginInfo} or ${syntaxPluginInfo} (if you only need parsing support) ` +
            `to the 'plugins' section of your Babel config.`;
        } else {
          helpMessage =
            `Support for this experimental syntax isn't currently enabled. ` +
            `Add ${syntaxPluginInfo} to the 'plugins' section of your Babel config.`;
        }
      }
    }
  }
  return helpMessage;
}
