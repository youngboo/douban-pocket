import React, { Component } from 'react'
import './style.css'
import { TYPE_LIST } from '../../../js/common/config'
class ListContent extends Component {
  render () {
    let view
    let info = this.props.info
    let type = TYPE_LIST[this.props.index]

    if (info) {
      view = type.list_tmpl.call(this, info)
    } else {
      view =
        <div>
            数据加载中
        </div>
    }
    return view
  }
}
export default ListContent
