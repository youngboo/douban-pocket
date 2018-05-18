import React, { Component } from 'react'
import './style.css'
import {Item} from 'semantic-ui-react'
class Music extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        var item = this.props.item
        return (
            <Item>
                <Item.Image size='tiny' src={item.image} />
                <Item.Content>
                    <Item.Header >{item.title}</Item.Header>
                    <Item.Meta>{item.title}</Item.Meta>
                    <Item.Extra>{item.attrs[0]}</Item.Extra>
                </Item.Content>
            </Item>
        )
    }
}
export default Music
