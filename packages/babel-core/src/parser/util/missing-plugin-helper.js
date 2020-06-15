// @flow

const pluginNameMap = {
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
  classPrivateProperties: {
    syntax: {
      name: "@babel/plugin-syntax-class-properties",
      url: "https://git.io/vb4yQ",
    },
    transform: {
      name: "@babel/plugin-proposal-class-properties",
      url: "https://git.io/vb4SL",
    },
  },
  classPrivateMethods: {
    syntax: {
      name: "@babel/plugin-syntax-class-properties",
      url: "https://git.io/vb4yQ",
    },
    transform: {
      name: "@babel/plugin-proposal-private-methods",
      url: "https://git.io/JvpRG",
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
  flow: {
    syntax: {
      name: "@babel/plugin-syntax-flow",
      url: "https://git.io/vb4yb",
    },
    transform: {
      name: "@babel/preset-flow",
      url: "https://git.io/JfeDn",
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
  importMeta: {
    syntax: {
      name: "@babel/plugin-syntax-import-meta",
      url: "https://git.io/vbKK6",
    },
  },
  jsx: {
    syntax: {
      name: "@babel/plugin-syntax-jsx",
      url: "https://git.io/vb4yA",
    },
    transform: {
      name: "@babel/preset-react",
      url: "https://git.io/JfeDR",
    },
  },
  logicalAssignment: {
    syntax: {
      name: "@babel/plugin-syntax-logical-assignment-operators",
      url: "https://git.io/vAlBp",
    },
    transform: {
      name: "@babel/plugin-proposal-logical-assignment-operators",
      url: "https://git.io/vAlRe",
    },
  },
  moduleAttributes: {
    syntax: {
      name: "@babel/plugin-syntax-module-attributes",
      url: "https://git.io/JfK3k",
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
  privateIn: {
    syntax: {
      name: "@babel/plugin-syntax-private-property-in-object",
      url: "https://git.io/JfK3q",
    },
    transform: {
      name: "@babel/plugin-proposal-private-property-in-object",
      url: "https://git.io/JfK3O",
    },
  },
  recordAndTuple: {
    syntax: {
      name: "@babel/plugin-syntax-record-and-tuple",
      url: "https://git.io/JvKp3",
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
      name: "@babel/preset-typescript",
      url: "https://git.io/JfeDz",
    },
  },

  // TODO: These plugins are now supported by default by @babel/parser: they can
  // be removed from this list. Although removing them isn't a breaking change,
  // it's better to keep a nice error message for users using older versions of
  // the parser. They can be removed in Babel 9.
};

//todo: we don't have plugin-syntax-private-property-in-object
pluginNameMap.privateIn.syntax = pluginNameMap.privateIn.transform;

const getNameURLCombination = ({ name, url }) => `${name} (${url})`;

/*
Returns a string of the format:
Support for the experimental syntax [@babel/parser plugin name] isn't currently enabled ([loc]):

[code frame]

Add [npm package name] ([url]) to the 'plugins' section of your Babel config
to enable [parsing|transformation].
*/
export default function generateMissingPluginMessage(
  missingPluginName: string,
  loc: { line: number, column: number },
  codeFrame: string,
): string {
  let helpMessage =
    `Support for the experimental syntax '${missingPluginName}' isn't currently enabled ` +
    `(${loc.line}:${loc.column + 1}):\n\n` +
    codeFrame;
  const pluginInfo = pluginNameMap[missingPluginName];
  if (pluginInfo) {
    const { syntax: syntaxPlugin, transform: transformPlugin } = pluginInfo;
    if (syntaxPlugin) {
      const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
      if (transformPlugin) {
        const transformPluginInfo = getNameURLCombination(transformPlugin);
        const sectionType = transformPlugin.name.startsWith("@babel/plugin")
          ? "plugins"
          : "presets";
        helpMessage += `\n\nAdd ${transformPluginInfo} to the '${sectionType}' section of your Babel config to enable transformation.
If you want to leave it as-is, add ${syntaxPluginInfo} to the 'plugins' section to enable parsing.`;
      } else {
        helpMessage +=
          `\n\nAdd ${syntaxPluginInfo} to the 'plugins' section of your Babel config ` +
          `to enable parsing.`;
      }
    }
  }
  return helpMessage;
}
