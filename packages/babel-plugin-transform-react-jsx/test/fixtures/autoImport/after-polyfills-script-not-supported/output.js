var _reactJsxRuntime = require("react/jsx-runtime");

// https://github.com/babel/babel/issues/12522
require('react-app-polyfill/ie11');

require('react-app-polyfill/stable');

const ReactDOM = require('react-dom');

ReactDOM.render( /*#__PURE__*/_reactJsxRuntime.jsx("p", {
  children: "Hello, World!"
}), document.getElementById('root'));
