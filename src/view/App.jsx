import React from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import AsyncDataService from '../js/service/AsyncDataService'
import {CONFIG,TYPE_LIST} from '../js/common/config'
import { Header, Segment } from 'semantic-ui-react'
import ShowDetail from './compont/show-detail/index'


const service = AsyncDataService.getInstance()
class App extends React.PureComponent {
  constructor(){
    super()
     this.typeList = TYPE_LIST
      this.defaultIndex = CONFIG.default
    this.state = {
        items:[],
        active:false,
        info:{},
        defaultIndex:this.defaultIndex,
        index:0,
        showMain:true

    }

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
        return this.type.url + searchValue
    }

  switchType(type){
      this.type = this.typeList[type]
      this.defaultIndex = this.type.index
      this.setState({defaultIndex:this.defaultIndex})
      this.handleSearchChange(this.searchValue)
  }
    handleListChange(id){
        let url = this.type.detail_url + id

        service.getDetailByUrl(url)
            .then((json)=>{
            console.log(json)
                this.setState({
                    info:json,
                    index:this.type.index,
                    showMain:false
                })
            })
    }
    // handleListChange(url,name){
    //   if(name==='pull'){
    //       this.handlePullData(url)
    //   }else{
    //       this.handleRefreshData(url)
    //   }
    // }

    handlePullData(url){
        if(this.type.page.count >= this.type.page.total){
            return
        }
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
        <div className={this.state.showMain?'app show':'app hide'}>
            <div className='show_main'>
            <header>
                <div style={{height:101}}>
                    <Segment basic clearing>
                    <Header content='口袋豆瓣'/>
                <Search onChange={this.handleSearchChange.bind(this)}/>
                    </Segment>
                </div>
            </header>
            <main>

                <div style={{height:window.innerHeight-185,overflow:'hidden'}}>

                    <List onChange={this.handleListChange.bind(this)}
                          tmpl={this.type.list_tmpl}
                          type={this.type.type_name}
                          index={this.type.index}
                          items={this.state.items}
                          url={this.url}
                          typeData={this.type}
                    />

                </div>
            </main>
            <footer>
                <div style={{height:75}}>
                    <Segment basic clearing >
                    <Bottom defaultIndex={this.state.defaultIndex} onChange={this.switchType.bind(this)}/>
                    </Segment>
                </div>

            </footer>
            </div>
            <div className='show_detail'>
                <ShowDetail
                    info={this.state.info}
                    index={this.state.index}
                    onChange={(action)=>{
                        if(action==='back'){
                            this.setState({showMain:true})
                        }
                    }}
                />
            </div>
        </div>
    )
  }
}

export default App
