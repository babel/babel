// https://github.com/babel/babel/issues/12522
ReactDOM.render( /*#__PURE__*/_jsx("p", {
  children: "Hello, World!"
}), document.getElementById('root')); // Imports are hoisted, so this is still ok

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { jsx as _jsx } from "react/jsx-runtime";
