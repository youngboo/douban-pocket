import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ItemDetail from './view/compont/item-detail/index'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/detail/:id' component={ItemDetail}/>
        </Switch>
    </BrowserRouter>,

  document.getElementById('root')
)
