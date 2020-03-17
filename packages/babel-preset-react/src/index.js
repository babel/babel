import { declare } from "@babel/helper-plugin-utils";
import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformReactJSXDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default declare((api, opts) => {
  api.assertVersion(7);

  const pragma = opts.pragma;
  const pragmaFrag = opts.pragmaFrag;
  const throwIfNamespace =
    opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  const useBuiltIns = !!opts.useBuiltIns;
  const { useSpread } = opts;
  const runtime = opts.runtime || "classic";
  const importSource = opts.importSource;

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
        },
      ],
      transformReactDisplayName,

      development && runtime === "classic" && transformReactJSXSource,
      development && runtime === "classic" && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
