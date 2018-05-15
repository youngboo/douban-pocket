import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import ListService from '../js/service/AsynListService'
import SEARCH_TYPE from '../js/common/enum'
import Detail from './detail/index'
import Util from '../js/common/util'
const listService = ListService.getInstance()
class App extends Component {
  constructor(){
    super()
    this.state = {items:[],active:false,info:{}}
    this.type = 0
  }
  handleSearchChange(searchValue){
    this.searchValue = searchValue
    let url = this.getUrl(searchValue)
    listService.findBooksBySearch(url)
    .then((json)=>{
      let items = this.getByType(json)
      this.setState({
        items:items
      })
    })

  }

    getUrl (searchValue) {
        let url = SEARCH_TYPE[this.type].url + searchValue
        return url
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
      this.type = type
      this.handleSearchChange(this.searchValue)
  }
    handleListChange(value){
      console.log(value)
        Util.getJsonp(this.getUrl('jio'))
            .then((myJson)=>{
                this.setState({
                    info:this.getByType(myJson)[0],
                    active:true
                })
            })

    }
  render () {
    return (
      <div className='app'>
        <h1>从零开发口袋豆瓣</h1>
        <Search onChange={this.handleSearchChange.bind(this)}/>
        <List onChange={this.handleListChange.bind(this)} items={this.state.items}/>
        <Bottom default={this.default} onChange={this.switchType.bind(this)}/>
          <Detail active={this.state.active} info={this.state.info}/>
      </div>
    )
  }
}

export default App
