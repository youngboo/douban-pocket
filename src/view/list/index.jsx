import React, { Component } from 'react'
import ListItem from './item';
import './style.css'
import {Item,Modal,Button,Image,Header} from 'semantic-ui-react'
import AsynListService from '../../js/service/AsynListService'
import Detail from '../detail/index'
import Util from '../../js/common/util'
class List extends Component {
    constructor(props) {
        super(props)
        this.items = [];
        this.temp = this.props.temp
        this.state= {detail:''}
        this.service = AsynListService.getInstance()
    }
  handleItemChange(value){
        this.props.onChange(value)

  }
  onItemClick(url) {

      this.service.getDetailByUrl(url)
          .then((json) => {
          console.log(json)
            this.setState({
                detail:json
            })
          })
  }
    render() {

        if (this.props.items) {
           this.items = this.props.items.map((item, index) => {
                //return(<ListItem onChange={this.handleItemChange.bind(this)} key={index} item={item}/>)
                // items.push({
                //     childKey:index,
                //     image:item.image,
                //     header:item.title,
                //     meta:item.id
                // })
                return(
                    <Item className='list-item' key={item.id} onClick={()=>this.onItemClick(item.url)}>
                        <Item.Image size='tiny' src={item.image} />
                        <Item.Content>
                            <Item.Header >{item.title}</Item.Header>
                            <Item.Meta>{item.id}</Item.Meta>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                    </Item>
                )
            })
        }

        return (
            <div>
                <Item.Group >
                    {this.items}
                </Item.Group>
                <Detail active={this.state.detail}/>
            </div>


        )
    }
}
export default List
