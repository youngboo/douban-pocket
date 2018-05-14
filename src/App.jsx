import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom'
import List from './list'
import jquery from 'jquery'
import Search from './search'
import ListService from './service/AsynListService'
import SEARCH_TYPE from './common/enum';
const listService = ListService.getInstance()
class App extends Component {
  constructor(){
    super()
    this.state = {items:[]}
    this.type = 0
    
  }
  handleSearchChange(value){
 
    let url = SEARCH_TYPE[this.type].url  + value
    listService.findBooksBySearch(url)
    .then((json)=>{
      let items = this.getByType(json)
      this.setState({
        items:items
      })
    })
    
  }
  getByType(json){
    let items = []
    switch(this.type){
      case 0:
      items = json.books
      break
      case 1:
      items = json.subjects
      break
      case 2:
      items = json.musics
      break
      default:
      break
    }
    return items
  }
  switchType(type){
    console.log(type)
    this.type = type
  }
  render () {
    return (
      <div className='app'>
        <h1>从零开发口袋豆瓣</h1>
        <Search onChange={this.handleSearchChange.bind(this)}/>
        <List items={this.state.items}/>
        <Bottom default={this.default} onChange={this.switchType.bind(this)}/>
      </div>
    )
  }
}

export default App
