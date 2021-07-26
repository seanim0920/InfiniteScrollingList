import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

let vw = document.documentElement.clientWidth / 100;
document.documentElement.style.setProperty('--vw', `${vw}px`);

var el = document.getElementById('root');

ReactDOM.render(<App width={el.clientWidth} height={el.clientHeight} />, document.getElementById('root')); //swaps out the root div with our own custom component