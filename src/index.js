import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

ReactDOM.render(
    <IconButton style={{color: "white"}} aria-label="settings">
        <BackIcon />
    </IconButton>,
    document.getElementById('backButton')
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);