import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from '../store/store'
import { Provider } from 'react-redux'

import App from '../containers/app'

import '../index.css'

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root')
);


