import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
class Type extends Component {
  handleTypeClick(){
    this.props.onChange(this.props.item.index)
  }
  render () {
    let item = this.props.item
    return (
      <Menu.Item onClick={this.handleTypeClick.bind(this)}>{item.name}</Menu.Item>
    )
  }
}

export default Type
