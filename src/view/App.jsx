import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import AsynDataService from '../js/service/AsynDataService'
import {CONFIG,TYPE_LIST} from '../js/common/config'
import { Container, Divider, Header, Segment } from 'semantic-ui-react'
import ExampleList from './compont/pullload/index'


const service = AsynDataService.getInstance()
class App extends Component {
  constructor(){
    super()
     this.typeList = TYPE_LIST
      this.defaultIndex = CONFIG.default
    this.state = {items:[],active:false,info:{},defaultIndex:this.defaultIndex}
    this.type = this.typeList[this.defaultIndex]
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
      this.defaultIndex = this.type.index
      this.setState({defaultIndex:this.defaultIndex})
      this.handleSearchChange(this.searchValue)
  }
    handleListChange(url,name){
      if(name==='pull'){
          this.handlePullData(url)
      }else{
          this.handleRefreshData(url)
      }


    }
    handlePullData(url){
        service.pullData(url,this.type.page,this.type.list_name)
            .then((page)=>{
                this.type.page = page
                this.setState({
                    items:this.type.page.list
                })
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
                <div style={{height:100}}>
                    <Segment basic >
                    <Header content='口袋豆瓣'/>
                <Search onChange={this.handleSearchChange.bind(this)}/>
                    </Segment>
                </div>
            </header>
            <main>

                <div style={{height:window.innerHeight-220,overflowY:'scroll'}}>
                    <Segment basic>
                    <List onChange={this.handleListChange.bind(this)}
                          tmpl={this.type.list_tmpl}
                          type={this.type.type_name}
                          index={this.type.index}
                          items={this.state.items}
                          url={this.url}
                    />
                    </Segment>
                </div>
            </main>
            <footer>
                <div style={{height:67}}>
                        <Segment basic>
                    <Divider/>
                    <Bottom defaultIndex={this.state.defaultIndex} onChange={this.switchType.bind(this)}/>
                        </Segment>
            </div>

            </footer>
        </div>
    )
  }
}

export default App
