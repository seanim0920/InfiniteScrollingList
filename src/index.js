import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

var el = document.getElementById('root');

ReactDOM.render(<App width={el.offsetWidth} height={el.offsetHeight}/>, document.getElementById('root')); //swaps out the root div with our own custom component