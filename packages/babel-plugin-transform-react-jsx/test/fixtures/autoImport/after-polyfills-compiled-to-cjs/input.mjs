// https://github.com/babel/babel/issues/12522

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <p>Hello, World!</p>,
    document.getElementById('root')
);
