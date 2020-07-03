import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactPure from "@babel/plugin-transform-react-pure-annotations";

export default declare((api, opts) => {
  api.assertVersion(7);

  let { pragma, pragmaFrag, development = false } = opts;

  const {
    pure,
    throwIfNamespace = true,
    runtime = process.env.BABEL_8_BREAKING ? "automatic" : "classic",
    importSource,
  } = opts;

  if (!process.env.BABEL_8_BREAKING) {
    if (runtime === "classic") {
      pragma = pragma || "React.createElement";
      pragmaFrag = pragmaFrag || "React.Fragment";
    }

    development = !!development;
  }

  if (process.env.BABEL_8_BREAKING) {
    if ("useSpread" in opts) {
      throw new Error(
        '@babel/preset-react: Since Babel 8, an inline object with spread elements is always used, and the "useSpread" option is no longer available. Please remove it from your config.',
      );
    }

    if ("useBuiltIns" in opts) {
      const useBuiltInsFormatted = JSON.stringify(opts.useBuiltIns);
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

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  return {
    plugins: [
      [
        development ? transformReactJSXDevelopment : transformReactJSX,
        process.env.BABEL_8_BREAKING
          ? {
              importSource,
              pragma,
              pragmaFrag,
              runtime,
              throwIfNamespace,
              pure,
            }
          : {
              importSource,
              pragma,
              pragmaFrag,
              runtime,
              throwIfNamespace,
              pure,
              useBuiltIns: !!opts.useBuiltIns,
              useSpread: opts.useSpread,
            },
      ],
      transformReactDisplayName,
      pure !== false && transformReactPure,
    ].filter(Boolean),
  };
});
