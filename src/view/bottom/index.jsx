import React, { Component } from 'react'
import { TYPE_LIST } from '../../js/common/config'
import './style.css'
class Bottom extends Component {
  constructor (props) {
    super(props)
    this.index = this.props.index
  }
  render () {
    this.index = this.props.defaultIndex
    this.list = TYPE_LIST.map((item, index) => {
      let icon = this.index === item.index ? item.icon + '_blue.png' : item.icon + '.png'
      return (
        <div className={'bottom_item flex-' + TYPE_LIST.length}
          key={index}
          onClick={() => {
            this.props.onChange(index)
          }}
        >
          <img src={'static/icon/' + icon} />
          <span style={{ color: this.index === item.index ? '#2185d0' : 'black' }}>{item.name}</span>
        </div>
      )
    })

    return (
      <div className='flex_bottom'>
        {this.list}
      </div>
    )
  }
}

export default Bottom
