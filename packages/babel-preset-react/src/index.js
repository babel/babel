import presetFlow from "babel-preset-flow";
import transformReactJSX from "babel-plugin-transform-react-jsx";
import transformSyntaxJSX from "babel-plugin-syntax-jsx";
import transformReactDisplayName from "babel-plugin-transform-react-display-name";

// These imports not yet used...
// import transformReactJSXSource from "babel-plugin-transform-react-jsx-source";
// import transformReactJSXSelf from "babel-plugin-transform-react-jsx-self";

export default {
  presets: [
    presetFlow
  ],
  plugins: [
    transformReactJSX,
    transformSyntaxJSX,
    transformReactDisplayName
  ],
  env: {
    development: {
      plugins: [
        // transformReactJSXSource,
        // transformReactJSXSelf
      ]
    }
  }
};
