import React from 'react'
import './style.css'
import Bottom from './bottom/index'
import List from './list/index'
import Search from './search/index'
import AsyncDataService from '../js/service/AsyncDataService'
import { CONFIG, TYPE_LIST } from '../js/common/config'
import ShowDetail from './compont/show-detail/index'
const service = AsyncDataService.getInstance()
class App extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      items: [],
      active: false,
      info: undefined,
      index: CONFIG.default,
      showMain: true,
      url: ''

    }
    this.type = TYPE_LIST[CONFIG.default]
    this.url = ''
  }

  handleSearchChange (searchValue) {
    this.searchValue = searchValue
    if (this.searchValue) {
      this.url = this.getSearchUrl(searchValue)
      this.setState({
        url: this.url,
        index: this.type.index
      })
    }
  }
  getSearchUrl (searchValue) {
    return this.type.url + searchValue
  }

  switchType (type) {
    this.type = TYPE_LIST[type]
    this.setState({
      index: this.type.index,
      url: this.url
    })
    this.handleSearchChange(this.searchValue)
  }
  handleListChange (id) {
    let url = this.type.detail_url + id
    service.getDetailByUrl(url)
      .then((json) => {
        this.setState({
          info: json,
          index: this.type.index,
          showMain: false
        })
      })
  }

  render () {
    return (
      <div className={this.state.showMain ? 'app show' : 'app hide'}>
        <div className='show_main wrap flex flex-v'>
          <header className='header'>
            <Search index={this.state.index} onChange={this.handleSearchChange.bind(this)} />
          </header>

          <List onChange={this.handleListChange.bind(this)}
            url={this.state.url}
            type={this.type}
          />

          <footer className='footer'>
            <Bottom index={this.state.index} onChange={this.switchType.bind(this)} />
          </footer>

        </div>
        <div className='show_detail'>
          <ShowDetail
            info={this.state.info}
            index={this.state.index}
            onChange={(action) => {
              if (action === 'back') {
                this.setState({ showMain: true })
              }
            }}
          />
        </div>
      </div>
    )
  }
}

export default App
