import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
import { BrowserRouter , Route, Switch } from 'react-router-dom'

import NoMatch from './view/compont/no-match/index'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route exact path='/' component={App}/>
            {/*<Route path="*" component={NoMatch}/>*/}
        </Switch>
    </BrowserRouter>,

  document.getElementById('root')
)
