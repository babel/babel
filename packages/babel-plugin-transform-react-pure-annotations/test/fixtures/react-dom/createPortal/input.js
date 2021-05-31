import * as React from 'react';
import ReactDOM from 'react-dom';

const Portal = ReactDOM.createPortal(React.createElement('div'), document.getElementById('test'));
