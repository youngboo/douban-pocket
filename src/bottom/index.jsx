import React, { Component } from 'react'
import SEARCH_TYPE from '../common/enum'
import Type from './type';
import './style.css'
class Bottom extends Component {
  constructor(props){
    super(props)
    this.list = SEARCH_TYPE.map((item,index)=>{
      return(
        <Type key={index} item={item} onChange={this.handleChange.bind(this)}/>
      )
    })
  }
  handleChange(value){
    this.props.onChange(value)
  }
  render () {
    return (
      <div className='bottom'>
        {this.list}
      </div>
    )
  }
}

export default Bottom
