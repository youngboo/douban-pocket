import React from 'react'
import './style.css'
import AsyncDataService from '../../js/service/AsyncDataService'
import { CONFIG } from '../../js/common/config'
const service = AsyncDataService.getInstance()
class List extends React.PureComponent {
  constructor (props) {
    super(props)
    this.url = ''
    this.pushText = ['加载更多', '没有更多了']
    this.state = {
      pullHeight: 0,
      pullText: '',
      pushHeight: 0,
      pushText: '',
      items: [],
      find: true
    }
    this.initPullAndPush()
  }
  initDataByUrl (url) {
    service.findByType(url, this.props.type.list_name)
      .then((page) => {
        this.props.type.page = page
        if (page.count === 0) {
          this.setState({
            find: false
          })
          return
        }
        this.canPullLoad = ((page.start + page.count) < page.total)
        this.setState({
          items: this.props.type.page.list,
          pushText: this.canPullLoad ? this.pushText[0] : this.pushText[1],
          find: true
        })
      })
  }
  initPullAndPush () {
    this.lastY = 0
    this.lastX = 0
    this.startX = 0
    this.startY = 0
    this.direction = 0
    this.pullDown = false
    this.pullUp = false
  }
  clearState () {
    this.setState({
      pullHeight: 0,
      pullText: '',
      pushText: this.pushText[1]
    })
  }

  handleItemClick (id) {
    this.props.onChange(id)
  }
  canTouchMove () {
    return this.listDiv.scrollHeight > this.listDiv.clientHeight
  }
  handleTouchStart (ev) {
    if (!this.canTouchMove()) {
      return false
    }
    this.initPullAndPush()
    let scrollTop = this.listDiv.scrollTop
    let scrollBottom = (scrollTop + this.listDiv.clientHeight) >= this.listDiv.scrollHeight
    let touch = ev.touches[0]
    this.startX = touch.clientX
    this.startY = touch.clientY
    this.lastX = this.startX
    this.lastY = this.startY
    if (scrollTop <= 0 && this.startY < this.listDiv.offsetTop + 200) {
      this.pullDown = true
    } else {
      this.pullDown = false
    }
    let bottom = this.listDiv.clientHeight + this.listDiv.offsetTop - 200
    if (scrollBottom && this.canPullLoad && this.startY > bottom && !CONFIG.auto_load) {
      this.pullUp = true
    } else {
      this.pullUp = false
    }
  }
  handleTouchMove (ev) {
    if (!this.canTouchMove()) {
      return false
    }
    let touch = ev.touches[0]
    let x = touch.clientX
    let y = touch.clientY

    let moveY = y - this.lastY

    if (this.pullDown) {
      if (Math.abs(moveY) > 3) {
        if (this.state.pullHeight >= 50) {
          this.direction = 1
        }

        let pullHeight = this.state.pullHeight + moveY
        if (pullHeight >= 50) {
          pullHeight = 50
        }
        if (pullHeight <= 0) {
          pullHeight = 0
        }
        this.setState({
          pullHeight: pullHeight,
          pullText: '下拉刷新'
        })
      }
    }

    if (this.pullUp && this.canPullLoad) {
      if (this.state.pushHeight >= 50) {
        this.direction = 0
      }
      let pushHeight = this.state.pushHeight - moveY
      if (pushHeight >= 50) {
        pushHeight = 50
      } if (pushHeight <= 0) {
        pushHeight = 0
      }

      this.setState({
        pushHeight: pushHeight,
        pushText: this.pushText[0]
      })
    }

    this.lastY = y
    this.lastX = x
  }
  initPullState () {
    this.setState({
      pullText: '',
      pullHeight: 0
    })
  }
  initPushState () {
    this.setState({
      pushText: this.pushText[1]
    })
  }
  handleTouchEnd (ev) {
    if (!this.canTouchMove()) {
      return false
    }
    let touch = ev.changedTouches[0]
    let endX = touch.clientX
    let endY = touch.clientY
    let moveX = this.startX - endX
    let moveY = this.startY - endY

    if (Math.abs(moveX) > 50 || Math.abs(moveY) < 50) {
      this.initPullAndPush()
      this.clearState()
      return
    }
    if (this.state.pullHeight >= 50 && this.pullDown && this.direction === 1) {
      this.setState({
        pullText: '加载中',
        pullHeight: 50
      })
      this.handleRefreshData()
    } else {
      this.initPullState()
    }
    if (this.state.pushHeight >= 50 && this.pullUp && this.direction === 0 && this.canPullLoad) {
      this.setState({
        pushText: '加载中'
      })
      this.handlePullData()
    } else {
      this.initPushState()
    }
  }
  handlePullData () {
    if (this.props.type.page.count >= this.props.type.page.total) {
      this.setState({
        pushText: this.pushText[1]
      })
      return
    }
    service.pullData(this.props.url, this.props.type.page, this.props.type.list_name)
      .then((page) => {
        this.props.type.page = page
        this.canPullLoad = ((page.start + page.count) < page.total)
        this.setState({
          items: this.props.type.page.list,
          pushHeight: 0,
          pushText: this.canPullLoad ? this.pushText[0] : this.pushText[1],
          find: true
        })
      })
      .catch((e) => {
        this.setState({
          pushText: '加载失败'
        })
      })
  }

  handleRefreshData () {
    service.refreshData(this.props.url, this.props.type.list_name)
      .then((page) => {
        this.props.type.page = page
        this.setState({
          items: this.props.type.page.list,
          pullHeight: 50,
          pullText: '已刷新'
        })
        setTimeout(() => {
          this.setState({
            items: this.props.type.page.list,
            pullHeight: 0,
            pullText: ''
          })
        }, 1000)
      })
  }
  handleScroll () {
    let scrollBottom = (this.listDiv.scrollTop + this.listDiv.clientHeight) >= this.listDiv.scrollHeight
    if (this.canPullLoad && this.canTouchMove() && scrollBottom && CONFIG.auto_load) {
      this.autoLoadData()
    }
  }
  autoLoadData () {
    this.handlePullData()
  }
  componentDidMount () {
    if (CONFIG.auto_load) {

    }
  }
  renderInit () {
    return (
      <main className='content flex-1 list no-search'>
        <div className='not-find'>
          <h3>在搜索框输入内容进行查找</h3>
        </div>
      </main>
    )
  }
  renderNotFound () {
    return (
      <main className='content flex-1 list no-search'>
        <div className='not-find'>
          <h3>搜索</h3>
          <span>没有找到相关内容，换个搜索词试试吧。</span>
        </div>
      </main>
    )
  }
  renderList (itemRender) {
    return (
      <main className='content flex-1 list'
        onTouchStart={this.handleTouchStart.bind(this)}
        onTouchMove={this.handleTouchMove.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)}
        onScroll={this.handleScroll.bind(this)}
        ref={(div) => { this.listDiv = div }}
      >
        <div className={this.state.pullText === '' ? 'pull_div hide' : 'pull_div'}>
          <span>{this.state.pullText}</span>
        </div>
        <div className='list_content' style={{ paddingTop: this.state.pullHeight }}>
          {itemRender}
        </div>
        <div className='push_div'>
          <span>{this.state.pushText}</span>
        </div>
      </main>
    )
  }

  render () {
    let url = this.props.url
    if (url && url !== '' && url !== this.url) {
      this.initDataByUrl(url)
      this.url = url
    }

    let items = this.state.items
    let itemRender
    if (items && items.length > 0) {
      itemRender = items.map((item) => {
        return this.props.type.list_tmpl(item, this)
      })
    }
    let render
    if (!url || url === '') {
      render = this.renderInit()
    } else if (this.state.find) {
      render = this.renderList(itemRender)
    } else if (!this.state.find) {
      render = this.renderNotFound()
    }
    return render
  }
}
export default List
