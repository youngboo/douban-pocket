import React, { Component } from 'react'
import { TYPE_LIST } from '../../js/common/config'
import './style.css'
import { Icon, Grid, Container, Segment } from 'semantic-ui-react'
class Bottom extends Component {
  constructor(props){
    super(props)

  }
  render () {
      this.index = this.props.defaultIndex
      this.list = TYPE_LIST.map((item,index)=>{
          return(
              <div className='bottom_item'
                           key={index}
                           onClick={()=>{
                               this.props.onChange(index)
                           }}
              >
                  {/*<i color={this.index===item.index?'blue':'grey'} name={item.icon}/>*/}
                  <span style={{color:this.index===item.index?'#2185d0':'black'}}>{item.name}</span>
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
