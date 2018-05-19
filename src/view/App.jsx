import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import ListService from '../js/service/AsynListService'
import {CONFIG,TYPE_LIST} from '../js/common/config'
import { Header} from 'semantic-ui-react'
import ExampleList from './compont/pullload/index'


const service = ListService.getInstance()
class App extends Component {
  constructor(){
    super()
     this.typeList = TYPE_LIST
    this.state = {items:[],active:false,info:{}}
    this.type = this.typeList[CONFIG.default]
      this.url = ''

  }

  handleSearchChange(searchValue){
    this.searchValue = searchValue
    this.url = this.getSearchUrl(searchValue)
    service.findByType(this.url,this.type.list_name)
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
    handleListChange(url,name){
      console.log(url)
      if(name==='pull'){
          this.handlePullData(url)
      }else{
          this.handleRefreshData(url)
      }


    }
    handlePullData(url){
        service.pullData(url,this.type.page,this.type.list_name)
            .then((page)=>{
                if(this.type.page != page){
                    this.type.page = page
                    this.setState({
                        items:this.type.page.list
                    })
                }

            })
    }
    handleRefreshData(url){
        service.refreshData(url,this.type.list_name)
            .then((page)=>{
                if(this.type.page != page){
                    this.type.page = page
                    this.setState({
                        items:this.type.page.list
                    })
                }

            })
    }
  render () {
    return (
        <div className='app'>
            <header>
                <Header content='口袋豆瓣'/>
            </header>
            <main>

                <Search onChange={this.handleSearchChange.bind(this)}/>
                    <List onChange={this.handleListChange.bind(this)}
                          tmpl={this.type.list_tmpl}
                          type={this.type.type_name}
                          index={this.type.index}
                          items={this.state.items}
                          url={this.url}
                    />
                    {/*<ExampleList/>*/}
            </main>
            <footer>
                <Bottom default={this.default} onChange={this.switchType.bind(this)}/>
            </footer>
        </div>
    )
  }
}

export default App
