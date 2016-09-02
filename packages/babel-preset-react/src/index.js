const transformReactJSX = require("babel-plugin-transform-react-jsx");
const transformFlowStripTypes = require("babel-plugin-transform-flow-strip-types");
const transformSyntaxFlow = require("babel-plugin-syntax-flow");
const transformSyntaxJSX = require("babel-plugin-syntax-jsx");
const transformReactDisplayName = require("babel-plugin-transform-react-display-name");

//const transformReactJSXSource = require("babel-plugin-transform-react-jsx-source");
//const transformReactJSXSelf = require("babel-plugin-transform-react-jsx-self");

export const plugins = [
  transformReactJSX,
  transformFlowStripTypes,
  transformSyntaxFlow,
  transformSyntaxJSX,
  transformReactDisplayName
];

export const env = {
  development: {
    plugins: [
      // transformReactJSXSource,
      // transformReactJSXSelf
    ]
  }
};
