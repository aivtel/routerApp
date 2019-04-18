import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reducerLocation from './store/reducer/reducerLocation';
import reducerAuth from './store/reducer/reducerAuth';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: reducerAuth,
    location: reducerLocation
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
