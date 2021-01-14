export default function normalizeOptions(options = {}) {
  if (process.env.BABEL_8_BREAKING) {
    if ("useSpread" in options) {
      throw new Error(
        '@babel/preset-react: Since Babel 8, an inline object with spread elements is always used, and the "useSpread" option is no longer available. Please remove it from your config.',
      );
    }

    if ("useBuiltIns" in options) {
      const useBuiltInsFormatted = JSON.stringify(options.useBuiltIns);
      throw new Error(
        `@babel/preset-react: Since "useBuiltIns" is removed in Babel 8, you can remove it from the config.
- Babel 8 now transforms JSX spread to object spread. If you need to transpile object spread with
\`useBuiltIns: ${useBuiltInsFormatted}\`, you can use the following config
{
  "plugins": [
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": ${useBuiltInsFormatted} }]
  ],
  "presets": ["@babel/preset-react"]
}`,
      );
    }
  }

  let { pragma, pragmaFrag } = options;

  const {
    pure,
    throwIfNamespace = true,
    runtime = "classic",
    importSource,
  } = options;

  // TODO: (Babel 8) Remove setting these defaults
  if (runtime === "classic") {
    pragma = pragma || "React.createElement";
    pragmaFrag = pragmaFrag || "React.Fragment";
  }

  // TODO: (Babel 8) Don't cast this option but validate it
  const development = !!options.development;

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  return {
    development,
    importSource,
    pragma,
    pragmaFrag,
    pure,
    runtime,
    throwIfNamespace,
  };
}
