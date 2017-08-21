import transformReactJSX from "babel-plugin-transform-react-jsx";
import transformSyntaxJSX from "babel-plugin-syntax-jsx";
import transformReactDisplayName from "babel-plugin-transform-react-display-name";
import transformReactJSXSource from "babel-plugin-transform-react-jsx-source";
import transformReactJSXSelf from "babel-plugin-transform-react-jsx-self";

export default function(context, opts = {}) {
  const development = opts.development || false;

  if (typeof development !== "boolean") {
    throw new Error("Preset react 'development' option must be a boolean.");
  }

  return {
    plugins: [
      transformReactJSX,
      transformSyntaxJSX,
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
}
