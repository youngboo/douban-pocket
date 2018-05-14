import React, { Component } from 'react'
import './style.css'

class Bottom extends Component {
  render () {
    return (
      <div className='bottom'>
        <span><a href='#'>图书</a></span>
        <span><a href='#'>电影</a></span>
        <span><a href='#'>音乐</a></span>
      </div>
    )
  }
}

export default Bottom
