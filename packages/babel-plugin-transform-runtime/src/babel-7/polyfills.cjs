// TODO(Babel 8) Remove this file
if (process.env.BABEL_8_BREAKING) {
  throw new Error(
    "Internal Babel error: This file should only be loaded in Babel 7",
  );
}

const pluginCorejs2 = require("babel-plugin-polyfill-corejs2").default;
const pluginCorejs3 = require("babel-plugin-polyfill-corejs3").default;
const pluginRegenerator = require("babel-plugin-polyfill-regenerator").default;

const pluginsCompat = "#__secret_key__@babel/runtime__compatibility";

function createCorejs2Plugin(options) {
  return (api, _, filename) => pluginCorejs2(api, options, filename);
}

function createCorejs3Plugin(options) {
  return (api, _, filename) => pluginCorejs3(api, options, filename);
}

function createRegeneratorPlugin(options, useRuntimeRegenerator, corejsPlugin) {
  if (!useRuntimeRegenerator) return corejsPlugin ?? undefined;
  return (api, _, filename) => {
    return {
      ...pluginRegenerator(api, options, filename),
      inherits: corejsPlugin ?? undefined,
    };
  };
}

module.exports = function createBasePolyfillsPlugin(
  { corejs, regenerator = true, moduleName },
  runtimeVersion,
  absoluteImports,
) {
  let proposals = false;
  let rawVersion;

  if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const corejsVersion = rawVersion ? Number(rawVersion) : false;

  if (![false, 2, 3].includes(corejsVersion)) {
    throw new Error(
      `The \`core-js\` version must be false, 2 or 3, but got ${JSON.stringify(
        rawVersion,
      )}.`,
    );
  }

  if (proposals && (!corejsVersion || corejsVersion < 3)) {
    throw new Error(
      "The 'proposals' option is only supported when using 'corejs: 3'",
    );
  }

  if (typeof regenerator !== "boolean") {
    throw new Error(
      "The 'regenerator' option must be undefined, or a boolean.",
    );
  }

  const polyfillOpts = {
    method: "usage-pure",
    absoluteImports,
    proposals,
    [pluginsCompat]: {
      useBabelRuntime: true,
      runtimeVersion,
      ext: "",
      moduleName,
    },
  };

  return createRegeneratorPlugin(
    polyfillOpts,
    regenerator,
    corejsVersion === 2
      ? createCorejs2Plugin(polyfillOpts)
      : corejsVersion === 3
        ? createCorejs3Plugin(polyfillOpts)
        : null,
  );
};
