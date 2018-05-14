import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom'
import List from './list'
import jquery from 'jquery'
import Search from './search'
import ListService from './service/AsynListService'
const listService = ListService.getInstance()
class App extends Component {
  constructor(){
    super()
   
    this.state = {items:[]}
    
  }
  handleSearchChange(value){
    
    listService.findBooksBySearch(value)
    .then((json)=>{
      this.setState({
        items:json.books
      })
    })
    
  }
  render () {
    return (
      <div className='app'>
        <h1>从零开发口袋豆瓣</h1>
        <Search onChange={this.handleSearchChange.bind(this)}/>
        <List items={this.state.items}/>
        <Bottom onChange={this.switchType.bind(this)}/>
      </div>
    )
  }
}

export default App
