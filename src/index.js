import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './index.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/IndexReducer';
import middleware from './middleware/IndexMw';

const store = createStore(rootReducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
