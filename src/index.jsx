import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter,browserHistory , Link, Route, Switch } from 'react-router-dom'
import ItemDetail from './view/compont/item-detail/index'
import ExampleList from './view/compont/pullload/index'
import NoMatch from './view/compont/no-match/index'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route exact path='/' component={App}/>
        <Route history={browserHistory} path='/detail/' component={ItemDetail}/>
            <Route path='/list/' component={ExampleList}/>
            <Route path="*" component={NoMatch}/>
        </Switch>
    </BrowserRouter>,

  document.getElementById('root')
)
