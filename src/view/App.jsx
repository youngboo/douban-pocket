import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import ListService from '../js/service/AsynListService'
import Detail from './detail/index'
import {CONFIG,TYPE_LIST} from '../js/common/config'
import { Container, Header, Rail, Responsive, Segment } from 'semantic-ui-react'
import PushRefresh from './compont/push-refresh/index'
import { Route } from 'react-router-dom'

const service = ListService.getInstance()
class App extends Component {
  constructor(){
    super()
     this.typeList = TYPE_LIST
    this.state = {items:[],active:false,info:{}}
    this.type = this.typeList[CONFIG.default]
  }

  handleSearchChange(searchValue){
    this.searchValue = searchValue
    let url = this.getSearchUrl(searchValue)
    service.findByType(url,this.type.list_name)
    .then((page)=>{

      this.type.page = page
      this.setState({
        items:this.type.page.list
      })
    })

  }

    getSearchUrl (searchValue) {
        let url = this.type.url + searchValue
        return url
    }

  switchType(type){
      this.type = this.typeList[type]
      this.handleSearchChange(this.searchValue)
  }
    handleItemClick(url){
       service.getDetailByUrl(url)
           .then((json) => {
               this.setState({
                   active:json
               })
           })

    }
  render () {
    return (
        <div className='app'>
            <main>
                <Header content='口袋豆瓣'/>
                <Search onChange={this.handleSearchChange.bind(this)}/>
                    <List tmpl={this.type.list_tmpl} type={this.type.list_name} onChange={this.handleItemClick.bind(this)} items={this.state.items}/>
            </main>
            <footer>
                <Bottom default={this.default} onChange={this.switchType.bind(this)}/>
            </footer>
            {/*<nav>*/}
                {/*<ul>*/}
                    {/*<li><Link to='/detail'>detail</Link></li>*/}
                {/*</ul>*/}
            {/*</nav>*/}
            {/**/}
        {/*<Detail active={this.state.active} onChange={(value)=>{this.setState({active:value})}}/>*/}
        </div>
    )
  }
}

export default App
