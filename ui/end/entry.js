import ReactDOM from 'react-dom';
import React from 'react';
import Login from './login';
import Message from './message';
let ui = (item, dom) =>{
    if(document.getElementById(dom)) ReactDOM.render(item, document.getElementById(dom));
};
ui(<Login/>, 'login');
ui(<Message/>, 'message');