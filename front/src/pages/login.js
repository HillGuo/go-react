import React from 'react'
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'


import Login from '../container/login/login'

import 'antd/dist/antd.css';


ReactDOM.render(
    <Provider >
       <Login></Login>
    </Provider>
    , document.getElementById('login')
);


