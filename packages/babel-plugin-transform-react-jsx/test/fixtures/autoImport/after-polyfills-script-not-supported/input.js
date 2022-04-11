// https://github.com/babel/babel/issues/12522

require('react-app-polyfill/ie11');
require('react-app-polyfill/stable');
const ReactDOM = require('react-dom');

ReactDOM.render(
    <p>Hello, World!</p>,
    document.getElementById('root')
);
