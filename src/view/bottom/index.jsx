import React, { Component } from 'react'
import {TYPE_LIST} from '../../js/common/config'
import './style.css'
import { Sticky, Icon, Grid } from 'semantic-ui-react'
class Bottom extends Component {
  constructor(props){
    super(props)
    this.list = TYPE_LIST.map((item,index)=>{
      return(
          <Grid.Column textAlign='center' key={index} onClick={()=>{this.props.onChange(index)}} >
              <Icon name={item.icon}/>
              <br/>
              {item.name}
              </Grid.Column>
      )
    })
  }
  handleChange(value){
    this.props.onChange(value)
  }
  render () {
    return (

      <Grid centered columns={3} >
        {this.list}
      </Grid>
    )
  }
}

export default Bottom
