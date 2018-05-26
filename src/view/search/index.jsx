import React, { Component } from 'react'
import { TYPE_LIST } from '../../js/common/config'
import './style.css'
class Search extends Component {
  constructor () {
    super()
    this.state = {
      content: ''
    }
  }
  componentDidMount () {
    this.input.focus()
  }
  handleInputChange () {
    this.setState({
      content: this.input.value === undefined ? '' : this.input.value
    })
    this.props.onChange(this.input.value)
  }
  handleKeyUp (ev) {
    let key = ev.keyCode
    if (key === 13) {
      this.handleInputChange()
    }
  }
  render () {
    let placeholder = TYPE_LIST[this.props.index].placeholder
    return (
      <div className='search'>
        <div className='input_search'>
          <img src='static/icon/search.png' />
          <input placeholder={placeholder} onKeyUp={this.handleKeyUp.bind(this)} defaultValue='' ref={input => { this.input = input }} />
        </div>

        <div className='search_button' onClick={this.handleInputChange.bind(this)} type='submit'>
          <span>搜索</span>
        </div>
      </div>
    )
  }
}
export default Search
