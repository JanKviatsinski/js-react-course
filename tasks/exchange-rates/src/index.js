import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {App} from './Components/App'
import {compose, createStore} from 'redux';
import {rootReducer} from './redux/rootReducer';
import Provider from 'react-redux/lib/components/Provider';

const store = createStore(
    rootReducer, compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

const app = (
    <Provider store={store}>
        <App/>
    </Provider>)

ReactDOM.render(
    <Router>
        {app}
    </Router>,
    document.getElementById('root')
)
