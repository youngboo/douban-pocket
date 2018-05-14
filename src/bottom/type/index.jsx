import React, { Component } from 'react'
import SEARCH_TYPE from '../../common/enum'
class Type extends Component {
  handleTypeClick(){
    this.props.onChange(this.props.item.index)
  }
  render () {
    let item = this.props.item
    return (
      <a href='#'><span  onClick={this.handleTypeClick.bind(this)} icon={item.icon}>{item.name}</span></a>
    )
  }
}

export default Type
