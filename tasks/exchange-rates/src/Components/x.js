import {
    Switch,
    Route,
} from 'react-router-dom'
import {ExchangeRates} from './ExchangeRates'

export function X(props) {
    const url = props.match.url
    console.log(props)
    return (
        <Switch>
            <Route path={url} exact component={ExchangeRates} />
            <Route path={`${url}/:currencyOne/:currencyTwo/:valueOne/:valueTwo/:string`} component={({ match }) =>
                <ExchangeRates
                    currencyOne={match.params.currencyOne}
                    currencyTwo={match.params.currencyTwo}
                    valueOne={match.params.valueOne}
                    valueTwo={match.params.valueTwo}
                    string={match.params.string}
                    // className={match.params.currencyOne}
                />
            }/>
            {/*<Route path={`${url}/:currencyOne/:currencyTwo/:valueOne/:valueTwo/:string`} render={({ match }) => {debugger; return <div>Day {match.params.b}</div>}} ></Route>*/}
        </Switch>
    )
}
