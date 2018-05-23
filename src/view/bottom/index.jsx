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
              <Grid.Column textAlign='center'
                           key={index}
                           onClick={()=>{
                               this.props.onChange(index)
                           }}
              >
                  <Icon size='big' color={this.index===item.index?'blue':'grey'} name={item.icon}/>
                  <br/>
                  <span style={{color:this.index===item.index?'#2185d0':'black'}}>{item.name}</span>
              </Grid.Column>
          )
      })

    return (
      <Grid centered columns={TYPE_LIST.length} >
        {this.list}
      </Grid>
    )
  }
}

export default Bottom
