import {
    Switch,
    Route,
} from 'react-router-dom'
import {ExchangeRates} from './ExchangeRates'

export function X(props) {
    const url = props.match.url
    console.log(props.match)
    return (
        <Switch>
            <Route path={url} exact component={ExchangeRates} />
            <Route path={`${url}/:x`} render={({ match }) => <div>Day {match.params.x}</div>} />
        </Switch>
    )
}
