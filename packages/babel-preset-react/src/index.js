import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default declare((api, opts) => {
  api.assertVersion(7);

  const {
    pragma,
    pragmaFrag,
    pure,
    throwIfNamespace = true,
    useSpread,
    runtime = "classic",
    importSource,
  } = opts;

  // TODO: (Babel 8) Don't cast these options but validate it
  const development = !!opts.development;
  const useBuiltIns = !!opts.useBuiltIns;

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
          useBuiltIns,
          useSpread,
          pure,
        },
      ],
      transformReactDisplayName,

      development && runtime === "classic" && transformReactJSXSource,
      development && runtime === "classic" && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
