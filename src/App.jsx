import React, { Component } from 'react'
import './style.css'
import Bottom from './bottom/Bottom'
class App extends Component {
  render () {
    return (
      <div className='app'>
        <h1>从零开发口袋豆瓣</h1>
        <Bottom />
      </div>
    )
  }
}

module.exports = App
