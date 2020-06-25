import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";
import transformReactPure from "@babel/plugin-transform-react-pure-annotations";

export default declare((api, opts) => {
  api.assertVersion(7);

  let { pragma, pragmaFrag } = opts;

  const {
    pure,
    throwIfNamespace = true,
    runtime = "classic",
    importSource,
  } = opts;

  // TODO: (Babel 8) Remove setting these defaults
  if (runtime === "classic") {
    pragma = pragma || "React.createElement";
    pragmaFrag = pragmaFrag || "React.Fragment";
  }

  // TODO: (Babel 8) Don't cast these options but validate it
  const development = !!opts.development;

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

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  const transformReactJSXPlugin =
    runtime === "automatic" && development
      ? transformReactJSXDevelopment
      : transformReactJSX;

  return {
    plugins: [
      [
        transformReactJSXPlugin,
        {
          importSource,
          pragma,
          pragmaFrag,
          runtime,
          throwIfNamespace,
          pure,
        },
      ],
      transformReactDisplayName,
      pure !== false && transformReactPure,

      development && runtime === "classic" && transformReactJSXSource,
      development && runtime === "classic" && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
