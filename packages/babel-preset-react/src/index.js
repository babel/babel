import transformReactJSX from "@babel/plugin-transform-react-jsx";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import transformSyntaxFlow from "@babel/plugin-syntax-flow";
import transformSyntaxJSX from "@babel/plugin-syntax-jsx";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";

// These imports not yet used...
// import transformReactJSXSource from "@babel/plugin-transform-react-jsx-source";
// import transformReactJSXSelf from "@babel/plugin-transform-react-jsx-self";

export default {
  plugins: [
    transformReactJSX,
    transformFlowStripTypes,
    transformSyntaxFlow,
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
