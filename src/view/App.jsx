import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import ListService from '../js/service/AsynListService'
import Detail from './detail/index'
import Util from '../js/common/util'
import {CONFIG,TYPE_LIST} from '../js/common/config'
import { Container, Header, Responsive, Segment } from 'semantic-ui-react'

const listService = ListService.getInstance()
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
    listService.findByType(url,this.type.list_name)
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
    handleItemClick(value){
        // Util.getJsonp(value)
        //     .then((myJson)=>{
        //         this.setState({
        //             info:this.getByType(myJson)[0],
        //             active:true
        //         })
        //     })

    }
  render () {
    return (
        <Container>
          <Segment textAlign='center' >
              <Header content='口袋豆瓣'/>

              <Search onChange={this.handleSearchChange.bind(this)}/>

              <Segment  textAlign='center'>
                 <List type={this.type.list_name} onChange={this.handleItemClick.bind(this)} items={this.state.items}/>
              </Segment>
              <Bottom default={this.default} onChange={this.switchType.bind(this)}/>

          </Segment>
        <Detail active={this.state.active} info={this.state.info}/>
        </Container>
    )
  }
}

export default App
