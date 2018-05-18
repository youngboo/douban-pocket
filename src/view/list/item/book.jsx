import React, { Component } from 'react'
import './style.css'
import {Item} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class Book extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        var item = this.props.item
        return (
            <Link to={'/detail/'+this.props.item.id}>
                <Item>
                <Item.Image size='mini' src={item.image} />
                <Item.Content>
                    <Item.Header >{item.title}</Item.Header>
                    <Item.Meta>{item.id}</Item.Meta>
                    <Item.Extra>{item.title}</Item.Extra>
                </Item.Content>
                </Item>
            </Link>
        )
    }
}
export default Book
