// https://github.com/babel/babel/issues/12522

ReactDOM.render(
    <p>Hello, World!</p>,
    document.getElementById('root')
);

// Imports are hoisted, so this is still ok
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
