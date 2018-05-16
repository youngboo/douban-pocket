import React, { Component } from 'react'
import './style.css'
import {Item} from 'semantic-ui-react'
class ListItem extends Component {
    constructor(props) {
        super(props)

    }

    handleClickItem(){
        this.props.onChange(this.props.item.id)
    }
    render() {
        var item = this.props.item
        return (
            <Item className='list-item' key={item.id} onClick={this.handleClickItem.bind(this)}>
                <Item.Image size='tiny' src={item.image} />
                <Item.Content>
                    <Item.Header >{item.title}</Item.Header>
                    <Item.Meta>{item.id}</Item.Meta>
                    <Item.Extra>Additional Details</Item.Extra>
                </Item.Content>
            </Item>
        )
    }
}
export default ListItem
