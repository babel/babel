import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformSyntaxJSX from "@babel/plugin-syntax-jsx";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default function(api, opts = {}) {
  const pragma = opts.pragma || "React.createElement";
  const pragmaFrag = opts.pragmaFrag || "React.Fragment";
  const throwIfNamespace =
    opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  const useBuiltIns = !!opts.useBuiltIns;

  if (typeof development !== "boolean") {
    throw new Error(
      "@babel/preset-react 'development' option must be a boolean.",
    );
  }

  return {
    plugins: [
      [
        transformReactJSX,
        { pragma, pragmaFrag, throwIfNamespace, useBuiltIns },
      ],
      transformSyntaxJSX,
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
}
