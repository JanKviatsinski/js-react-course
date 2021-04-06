import { Addresses } from './addresses'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import React from 'react'
import '../index.css'

const routes = [
    {
        path: '/',
        isExact: true,
        component: (props) => <Redirect to='/widget'/>
    },
    {
        path: '/widget',
        isExact: false,
        component: Addresses
    },
]

export function App() {
    return (
        <Switch>
            {routes.map(({ path, component, isExact}) => (
                <Route key={path} path={path} exact={isExact} component={component} />
            ))}
            <Route render={() => <div>NOT FOUND PAGE</div>} />
        </Switch>
    )
}
